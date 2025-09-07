import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { stockApi, BASE_URL } from "@/api";
import type { Item } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    stockApi
      .getItems()
      .then(setItems)
      .catch((err: unknown) => {
        setItems([]);
        toast({
          title: err instanceof Error ? err.message : "Erreur lors du chargement",
          variant: "destructive",
        });
      });
  }, [toast]);

  const resolveImageUrl = (url?: string | null) => {
    if (!url) return null;
    if (/^(https?:|data:|blob:)/.test(url)) return url;
    return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    try {
      await stockApi.deleteItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast({ title: "Article supprimé", variant: "success" });
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Articles</h1>
            <p className="text-gray-600 text-lg">Gérez les articles du stock</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <Button
              className="w-full bg-primary-m3 text-white hover:bg-primary-m3/90"
              aria-label="Nouvel article"
              onClick={() => navigate("/stock/items/new")}
            >
              <Plus className="w-4 h-4 md:mr-2" />
              <span>Nouvel article</span>
            </Button>
          </div>
        </div>

        <div className="space-y-4 md:hidden">
          {items.map((item) => (
            <Card
              key={item.id}
              className="border border-border bg-background cursor-pointer"
              onClick={() => navigate(`/stock/items/${item.id}`)}
            >
              {item.image && (
                <div className="w-full h-40 bg-surface-container-low overflow-hidden rounded-t-md">
                  <img
                    src={resolveImageUrl(item.image) || ''}
                    alt={item.title || 'Article'}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-black">
                  {item.title || "Article"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-black">
                <div className="flex items-center justify-between text-sm">
                  {typeof item.quantityInStock === 'number' && <span>Qté: {item.quantityInStock}</span>}
                  {typeof item.salePrice === 'number' && <span>PV: {item.salePrice}€</span>}
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-destructive text-white hover:bg-destructive/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="hidden md:block bg-card border border-border">
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[56px]">Image</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Prix achat</TableHead>
                    <TableHead>Prix vente</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/stock/items/${item.id}`)}
                    >
                      <TableCell>
                        {item.image ? (
                          <div className="h-11 w-11 rounded-md overflow-hidden bg-surface-container-low border border-border">
                            <img
                              src={resolveImageUrl(item.image) || ''}
                              alt={item.title || 'Article'}
                              className="h-full w-full object-cover"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                            />
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{typeof item.quantityInStock === 'number' ? item.quantityInStock : ''}</TableCell>
                      <TableCell>{typeof item.purchasePrice === 'number' ? `${item.purchasePrice}€` : ''}</TableCell>
                      <TableCell>{typeof item.salePrice === 'number' ? `${item.salePrice}€` : ''}</TableCell>
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="destructive"
                          size="sm"
                          className="bg-destructive text-white hover:bg-destructive/90"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {items.length === 0 && (
              <p className="text-center text-black py-6">Aucun article trouvé</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Items;
