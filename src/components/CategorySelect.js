import { useEffect, useState } from "react";

export default function CategorySelect({ onChange, value }) {
  const [categories, setCategories] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // UseEffect pour appel d'API 1 seule fois au montage
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("https://opentdb.com/api_category.php", {
          signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // api_category donne { trivia_categories: [ { id, name }, ... ] }
        const list = Array.isArray(json.trivia_categories)
          ? json.trivia_categories
          : [];
        setCategories(list);
      } catch (err) {
        // Gestion d'erreur
        if (err.name !== "AbortError") setError(err);
      } finally {
        // Nettoyage
        setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  if (isLoading) return <div>Récupération des catégories...</div>;
  if (error) return <div>Erreur lors du chargement: {error.message}</div>;

  return (
    <select
      id="categorySelect"
      name="categorySelect"
      value={value}
      onChange={onChange}
    >
      <option key="0" value="">
        -- Sélectionnez une catégorie --
      </option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
