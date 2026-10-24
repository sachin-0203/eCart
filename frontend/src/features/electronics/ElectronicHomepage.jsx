import CategoryLandingPage from "../catalog/CategoryLandingPage";
import { electronicsLandingData } from "../catalog/categoryLandingData";

export default function ElectronicHomepage() {
  return <CategoryLandingPage {...electronicsLandingData} />;
}
