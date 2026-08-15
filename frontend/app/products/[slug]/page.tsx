import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { getProductBySlug, productsPageProducts } from "@/lib/productCatalog";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productsPageProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Origin Store"
    };
  }

  return {
    title: `${product.displayName} | Origin Store`,
    description: product.description
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <ProductDetailClient product={product} />
      <Footer />
    </>
  );
}
