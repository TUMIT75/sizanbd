import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { formatBDT } from '../utils/formatters';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { X, Plus, ShoppingBag, Scale, Check, Trash2 } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, addToCompare, addToCart } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const availableToAdd = PRODUCTS.filter(
    (p) => !compareList.some((cp) => cp.id === p.id)
  );

  const specKeys: { label: string; key: keyof Product['specs'] }[] = [
    { label: 'Display & Screen', key: 'display' },
    { label: 'Processor', key: 'processor' },
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Rear Camera', key: 'rearCamera' },
    { label: 'Front Camera', key: 'frontCamera' },
    { label: 'Battery Capacity', key: 'battery' },
    { label: 'Charging Speed', key: 'charging' },
    { label: 'Operating System', key: 'os' },
    { label: 'Network & SIM', key: 'network' },
  ];

  const handleQuickAdd = (p: Product) => {
    const primary = p.variants[0] || {
      id: 'default',
      name: 'Standard',
      colorName: 'Standard',
      price: p.price,
      regularPrice: p.regularPrice,
    };

    addToCart(
      {
        id: `${p.id}-${primary.id}`,
        productId: p.id,
        slug: p.slug,
        title: p.title,
        brand: p.brand,
        image: p.thumbnail,
        variantId: primary.id,
        variantName: primary.name,
        colorName: primary.colorName,
        storage: primary.storage,
        price: primary.price,
        regularPrice: primary.regularPrice,
        status: p.status,
      },
      1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Compare Devices' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
            Device Comparison
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Compare specs side by side to pick the right device for your everyday needs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {compareList.length > 1 && (
            <label className="flex items-center gap-2 text-xs text-[#111111] cursor-pointer">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="rounded border-[#CCCCCC] text-[#111111] focus:ring-0 cursor-pointer"
              />
              <span>Highlight differences</span>
            </label>
          )}

          {compareList.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearCompare}
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Clear Table
            </Button>
          )}
        </div>
      </div>

      {compareList.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#E5E5E5] rounded-xl p-8">
          <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center text-[#737373] mx-auto mb-3">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-[#111111]">
            No devices selected to compare
          </h3>
          <p className="text-xs text-[#737373] max-w-sm mx-auto mt-1 mb-6">
            Browse our catalog and click the compare icon on any product card, or choose from our top models below.
          </p>
          <Button variant="primary" size="md" onClick={() => setIsAddModalOpen(true)}>
            Choose Devices to Compare
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full min-w-[700px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#FAFAF8]">
                <th className="p-4 text-left font-bold text-[#737373] w-48 uppercase tracking-wider text-[11px]">
                  Feature / Specs
                </th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 text-left w-64 align-top">
                    <div className="relative space-y-3">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-1 -right-1 text-[#A3A3A3] hover:text-red-600 p-1 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="w-24 h-24 mx-auto bg-white border border-[#E5E5E5] rounded-lg p-2 flex items-center justify-center">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-[#737373]">
                          {product.brand}
                        </span>
                        <Link
                          to={`/product/${product.slug}`}
                          className="font-bold text-[#111111] hover:text-[#1E5EFF] block mt-0.5 line-clamp-1"
                        >
                          {product.title}
                        </Link>
                        <span className="text-sm font-extrabold text-[#111111] block mt-1">
                          {formatBDT(product.price)}
                        </span>
                        <div className="mt-1 flex justify-center">
                          <Badge type="status" value={product.status} />
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleQuickAdd(product)}
                        fullWidth
                        leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                      >
                        Add to Bag
                      </Button>
                    </div>
                  </th>
                ))}

                {/* Empty slot placeholder if < 3 */}
                {compareList.length < 3 && (
                  <th className="p-4 text-center w-64 align-middle bg-[#FAFAF8]/50">
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#CCCCCC] rounded-xl hover:border-[#111111] transition-colors w-full cursor-pointer"
                    >
                      <Plus className="w-6 h-6 text-[#737373] mb-1" />
                      <span className="text-xs font-semibold text-[#111111]">
                        Add Another Device
                      </span>
                      <span className="text-[10px] text-[#A3A3A3] mt-0.5">
                        Up to 3 total
                      </span>
                    </button>
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F0F0EE]">
              {/* Category */}
              <tr>
                <td className="p-3.5 font-semibold text-[#737373] bg-[#FAFAF8]">
                  Category
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3.5 text-[#111111]">
                    {p.categoryName}
                  </td>
                ))}
                {compareList.length < 3 && <td className="p-3.5" />}
              </tr>

              {/* Warranty */}
              <tr>
                <td className="p-3.5 font-semibold text-[#737373] bg-[#FAFAF8]">
                  Warranty Terms
                </td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3.5 text-[#111111]">
                    {p.warranty.official}
                  </td>
                ))}
                {compareList.length < 3 && <td className="p-3.5" />}
              </tr>

              {/* Detailed Specs Rows */}
              {specKeys.map(({ label, key }) => {
                const values = compareList.map((p) => p.specs[key] || 'N/A');
                const isDifferent =
                  values.length > 1 && new Set(values).size > 1;

                return (
                  <tr
                    key={key}
                    className={
                      highlightDifferences && isDifferent
                        ? 'bg-amber-50/40 font-medium'
                        : ''
                    }
                  >
                    <td className="p-3.5 font-semibold text-[#737373] bg-[#FAFAF8]">
                      {label}
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3.5 text-[#111111] leading-relaxed">
                        {p.specs[key] || '—'}
                      </td>
                    ))}
                    {compareList.length < 3 && <td className="p-3.5" />}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal to add device to compare */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Device to Comparison"
        maxWidth="lg"
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {availableToAdd.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg hover:bg-[#FAFAF8] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-12 h-12 object-contain rounded bg-white border border-[#E5E5E5] p-1 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#111111] truncate">
                    {product.title}
                  </p>
                  <p className="text-[11px] text-[#737373]">
                    {product.brand} · {formatBDT(product.price)}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  addToCompare(product);
                  if (compareList.length + 1 >= 3) {
                    setIsAddModalOpen(false);
                  }
                }}
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
