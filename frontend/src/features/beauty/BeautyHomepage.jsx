import CategoryLandingPage from "../catalog/CategoryLandingPage";
import { beautyLandingData } from "../catalog/categoryLandingData";

export default function BeautyHomepage() {
  return <CategoryLandingPage {...beautyLandingData} />;
}
