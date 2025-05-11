<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return Inertia::render('admin/product/index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/product/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo'       => 'nullable|array',
            'price'       => 'required|numeric|min:0',
            'active'      => 'required|boolean',
        ]);

        Product::create($validated);

        return redirect()->route('product.index')->with('success', 'Produto criado com sucesso.');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('admin/product/edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo'       => 'nullable|array',
            'price'       => 'required|numeric|min:0',
            'active'      => 'required|boolean',
        ]);

        $product->update($validated);

        return redirect()->route('product.index')->with('success', 'Produto atualizado com sucesso.');
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:products,id',
        ]);

        $product = Product::findOrFail($request->id);
        $product->delete();

        return redirect()->route('product.index')->with('success', 'Produto excluído com sucesso.');
    }
}
