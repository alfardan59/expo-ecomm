import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Cart } from "@/types";

const useCart = () => {
    const api = useApi();
    const queryClient = useQueryClient();

    const addToCartMutation = useMutation({
        mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
        const { data } = await api.post<{ cart: Cart }>("/cart", { productId, quantity });
        return data.cart;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });

    const updateQuantityMutation = useMutation({
        mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
        const { data } = await api.put<{ cart: Cart }>(`/cart/${productId}`, { quantity });
        return data.cart;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });

    const removeFromCartMutation = useMutation({
        mutationFn: async (productId: string) => {
        const { data } = await api.delete<{ cart: Cart }>(`/cart/${productId}`);
        return data.cart;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });

    const clearCartMutation = useMutation({
        mutationFn: async () => {
        const { data } = await api.delete<{ cart: Cart }>("/cart");
        return data.cart;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });



  return {
    addToCart: addToCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdating: updateQuantityMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
    isClearing: clearCartMutation.isPending,
  }
}

export default useCart