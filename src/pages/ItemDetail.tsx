import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Save } from "lucide-react";
import { stockApi, BASE_URL } from "@/api";
import type { NewItem } from "@/types";
import { useToast } from "@/hooks/use-toast";

const ItemDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<NewItem>({
    title: "",
    purchasePrice: undefined,
    salePrice: undefined,
    description: "",
    quantityInStock: undefined,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!id) return;
    stockApi
      .getItem(id)
      .then(item => {
        setFormData({
          title: item.title ?? "",
          purchasePrice: item.purchasePrice,
          salePrice: item.salePrice,
          description: item.description ?? "",
          quantityInStock: item.quantityInStock,
        });
        setExistingImageUrl(item.image ?? null);
      })
      .catch((err: unknown) => {
        toast({
          title: err instanceof Error ? err.message : "Erreur lors du chargement",
          variant: "destructive",
        });
      });
  }, [id, toast]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreviewUrl(null);
  }, [imageFile]);

  const handleChange = (field: keyof NewItem, value: string) => {
    if (field === 'purchasePrice' || field === 'salePrice' || field === 'quantityInStock') {
      const num = value === '' ? undefined : Number(value);
      setFormData(prev => ({ ...prev, [field]: isNaN(num as number) ? undefined : num }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        title: formData.title,
        purchasePrice: formData.purchasePrice,
        salePrice: formData.salePrice,
        description: formData.description,
        quantityInStock: formData.quantityInStock,
      } as NewItem;

      let saved = null as null | { id: string };
      if (id) {
        saved = await stockApi.updateItem(id, payload);
        toast({ title: "Article mis à jour", variant: "success" });
      } else {
        saved = await stockApi.createItem(payload);
        toast({ title: "Article créé", variant: "success" });
      }

      if (imageFile) {
        const itemId = (saved && saved.id) || id!;
        await stockApi.uploadItemImage(itemId, imageFile);
        toast({ title: "Image envoyée", variant: "success" });
      }

      navigate("/stock/items");
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : "Erreur lors de l'enregistrement",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Supprimer cet article ?")) return;
    try {
      await stockApi.deleteItem(id);
      toast({ title: "Article supprimé", variant: "success" });
      navigate("/stock/items");
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">
            {id ? "Fiche article" : "Nouvel article"}
          </h1>
        </div>
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-black">
              {id ? "Modifier l'article" : "Créer un article"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-black font-medium">Titre</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleChange("title", e.target.value)}
                className="bg-background border-border text-black"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantityInStock" className="text-black font-medium">Quantité en stock</Label>
                <Input
                  id="quantityInStock"
                  type="number"
                  value={formData.quantityInStock ?? ''}
                  onChange={(e) => handleChange("quantityInStock", e.target.value)}
                  className="bg-background border-border text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchasePrice" className="text-black font-medium">Prix d'achat (€)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  step="0.01"
                  value={formData.purchasePrice ?? ''}
                  onChange={(e) => handleChange("purchasePrice", e.target.value)}
                  className="bg-background border-border text-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salePrice" className="text-black font-medium">Prix de vente (€)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  step="0.01"
                  value={formData.salePrice ?? ''}
                  onChange={(e) => handleChange("salePrice", e.target.value)}
                  className="bg-background border-border text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageFile" className="text-black font-medium">Image (fichier)</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="bg-background border-border text-black"
                />
                <div className="flex items-center gap-2">
                  {imageFile && (
                    <p className="text-sm text-gray-600">Fichier sélectionné: {imageFile.name}</p>
                  )}
                  {imageFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImageFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                    >
                      Retirer l'image
                    </Button>
                  )}
                </div>
                {(() => {
                  const url = imagePreviewUrl
                    || (existingImageUrl
                        ? (/^(https?:|data:|blob:)/.test(existingImageUrl)
                          ? existingImageUrl
                          : `${BASE_URL}${existingImageUrl.startsWith('/') ? '' : '/'}${existingImageUrl}`)
                        : null);
                  return url ? (
                  <div className="mt-2">
                    <img
                      src={url}
                      alt="Prévisualisation"
                      className="h-48 w-full max-w-md rounded-md border border-border object-contain"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {imagePreviewUrl ? 'Prévisualisation du fichier sélectionné' : 'Image actuelle'}
                    </p>
                  </div>
                  ) : null;
                })()}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-black font-medium">Description</Label>
              <Input
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleChange("description", e.target.value)}
                className="bg-background border-border text-black"
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              {id && (
                <Button
                  variant="destructive"
                  className="bg-destructive text-white hover:bg-destructive/90"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                </Button>
              )}
              <Button
                className="bg-primary-m3 text-white hover:bg-primary-m3/90"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" /> {id ? "Sauvegarder" : "Créer"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ItemDetail;
