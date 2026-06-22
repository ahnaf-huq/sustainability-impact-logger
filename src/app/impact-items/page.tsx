async function getItems() {
  const res = await fetch(
    "http://localhost:3000/api/impact-items",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function ImpactItemsPage() {
  const items = await getItems();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Impact Items
      </h1>

      <ul className="space-y-4">
        {items.map((item: any) => (
          <li
            key={item.id}
            className="border rounded p-4"
          >
            <h2 className="font-semibold">
              {item.title}
            </h2>

            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}