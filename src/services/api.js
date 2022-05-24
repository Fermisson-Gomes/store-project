export async function getCategories() {
  const urlCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const resultFetch = await fetch(urlCategories);
  const resultJSON = await resultFetch.json();
  return resultJSON;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId) {
    // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
    const urlProducts = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const resultFetch = await fetch(urlProducts);
    const resultJSON = await resultFetch.json();
    return resultJSON;
  }

  if (query) {
    const urlProducts = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const resultFetch = await fetch(urlProducts);
    const resultJSON = await resultFetch.json();
    return resultJSON;
  }
}
