import React, { useEffect, useRef, useState } from "react";
import {
  LogOut,
  UserRound,
  X,
  Mail,
  AtSign,
  Camera,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfileMenu({
  name,
  username,
  mail,
  onLogout,
  onClose,
}) {
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load profile picture directly from ecart_user
  const [profilePicture, setProfilePicture] = useState(() => {
    try {
      const savedUser = localStorage.getItem("ecart_user");

      if (savedUser) {
        const userData = JSON.parse(savedUser);
        return userData.profile || null;
      }

      return null;
    } catch (error) {
      console.error("Failed to load profile picture:", error);
      return null;
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle profile picture upload
  const handleProfilePicture = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image.");
      return;
    }

    // Limit to 2MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please select an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      try {
        const savedUser = localStorage.getItem("ecart_user");

        if (!savedUser) return;

        const userData = JSON.parse(savedUser);

        // Save profile picture inside user object
        userData.profile = imageData;

        localStorage.setItem(
          "ecart_user",
          JSON.stringify(userData)
        );

        // Immediately update the menu
        setProfilePicture(imageData);
      } catch (error) {
        console.error(
          "Failed to save profile picture:",
          error
        );
      }
    };

    reader.readAsDataURL(file);
  };

  // Remove profile picture
  const removeProfilePicture = () => {
    try {
      const savedUser = localStorage.getItem("ecart_user");

      if (!savedUser) return;

      const userData = JSON.parse(savedUser);

      delete userData.profile;

      localStorage.setItem(
        "ecart_user",
        JSON.stringify(userData)
      );

      setProfilePicture(null);
    } catch (error) {
      console.error(
        "Failed to remove profile picture:",
        error
      );
    }
  };

  return (
    <div
      ref={menuRef}
      className="
        absolute right-0 top-full z-[100]
        mt-3 w-[320px]
        overflow-hidden
        rounded-2xl
        border border-border-color
        bg-background
        shadow-[0_20px_60px_rgba(11,46,89,0.16)]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-base font-semibold text-primary">
            My Account
          </p>

          <p className="mt-0.5 text-xs text-text-secondary">
            Manage your profile
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            flex h-8 w-8 items-center justify-center
            rounded-full
            text-text-secondary
            transition
            hover:bg-surface
            hover:text-primary
          "
        >
          <X size={17} />
        </button>
      </div>

      {/* Profile */}
      <div className="px-4">
        <div className="rounded-2xl bg-surface p-4">
          <div className="flex items-center gap-3.5">

            {/* Profile Picture */}
            <div className="relative shrink-0">

              <div
                className="
                  h-14 w-14
                  overflow-hidden
                  rounded-full
                  bg-primary
                "
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt={name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white">
                    <UserRound
                      size={24}
                      strokeWidth={1.8}
                    />
                  </div>
                )}
              </div>

              {/* Camera button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="
                  absolute
                  -bottom-1
                  -right-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-surface
                  bg-primary
                  text-white
                  shadow-sm
                  transition
                  hover:scale-105
                  hover:opacity-90 cursor-pointer p-1
                "
                aria-label="Change profile picture"
              >
                <Camera size={13} />
              </button>

              {/* Hidden input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePicture}
                className="hidden"
              />
            </div>

            {/* User Details */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-primary">
                {name || "User"}
              </p>

              {username && (
                <div className="mt-1 min-w-0">

                  <p className="truncate text-sm text-text-secondary">
                    {username}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Change / Remove */}
          {/* <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="
                flex-1
                rounded-lg
                border border-border-color
                bg-background
                px-3
                py-2
                text-xs
                font-semibold
                text-primary
                transition
                hover:bg-white
              "
            >
              Change photo
            </button>

            {profilePicture && (
              <button
                type="button"
                onClick={removeProfilePicture}
                className="
                  rounded-lg
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-50
                "
              >
                Remove
              </button>
            )}
          </div> */}
        </div>
      </div>

      {/* Email */}
      {mail && (
        <div className="mx-4 mt-3 rounded-2xl border border-border-color bg-background">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-primary">
              <Mail size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                Email
              </p>

              <p className="mt-0.5 truncate text-sm font-medium text-primary">
                {mail}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-4">
        <button
          type="button"
          onClick={onLogout}
          className="
            flex w-full items-center justify-center gap-2
            rounded-xl
            border border-red-200
            bg-red-50
            px-4 py-3
            text-sm font-semibold
            text-red-600
            transition
            hover:border-red-300
            hover:bg-red-100
          "
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );
}