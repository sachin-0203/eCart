import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft, LoaderCircle } from "lucide-react";
import ProductForm from "../../components/ProductForm";
import { createProduct, getProduct, updateProduct } from "../../api/products";

export default function ProductFormPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(productId);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [loadError, setLoadError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!productId) return undefined;

    let isCurrent = true;
    getProduct(productId)
      .then((data) => {
        if (isCurrent) setProduct(data);
      })
      .catch((error) => {
        if (isCurrent) setLoadError(error.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [productId]);

  const handleSubmit = async (formData) => {
    setIsSaving(true);
    try {
      if (isEditing) {
        await updateProduct(productId, formData);
        toast.success("Product updated.");
      } else {
        await createProduct(formData);
        toast.success("Product created.");
      }
      navigate("/admin/products");
    } catch (error) {
      toast.error(`Could not ${isEditing ? "update" : "create"} product`, {
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          All products
        </Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          Catalog
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {isEditing ? "Edit product" : "Add a product"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {isEditing
            ? "Update the product details in your catalog."
            : "Fill in the product information to add it to your catalog."}
        </p>
      </div>

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="animate-spin" size={20} />
          Loading product...
        </div>
      ) : loadError ? (
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
          <AlertCircle className="mx-auto text-red-500" size={30} />
          <h2 className="mt-3 font-semibold text-slate-900">
            Could not load product
          </h2>
          <p className="mt-1 text-sm text-slate-500">{loadError}</p>
          <Link
            to="/admin/products"
            className="mt-5 inline-block rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to products
          </Link>
        </div>
      ) : (
        <ProductForm
          initialProduct={product}
          isSaving={isSaving}
          onSubmit={handleSubmit}
          submitLabel={isEditing ? "Save changes" : "Create product"}
        />
      )}
    </div>
  );
}
