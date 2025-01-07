const Material = require('../models/material.model');
const Color = require('../models/color.model');
const Pack = require('../models/pack.model');
const Product = require('../models/product.model');

// Mock data for Materials
const mockMaterials = [
  { name: 'Corrugated Cardboard', hardness: 2 },
  { name: 'Foam', hardness: 1 },
  { name: 'Plastic Film', hardness: 1 },
  { name: 'Aluminum', hardness: 3 },
  { name: 'Plywood', hardness: 3 },
  { name: 'Shrink Wrap', hardness: 1 },
  { name: 'Bubble Wrap', hardness: 1 },
  { name: 'Glass Fiber', hardness: 2 },
  { name: 'Polypropylene', hardness: 2 },
  { name: 'Rubber Foam', hardness: 1 },
  { name: 'Wax Coated Paper', hardness: 1 },
  { name: 'Silicone', hardness: 2 },
  { name: 'Carbon Fiber', hardness: 3 },
  { name: 'PVC', hardness: 2 },
  { name: 'Steel', hardness: 3 },
  { name: 'Titanium', hardness: 3 },
  { name: 'High-Density Foam', hardness: 2 },
  { name: 'Acrylic Glass', hardness: 2 },
  { name: 'Copper', hardness: 3 },
  { name: 'Plastic Board', hardness: 1 },
  { name: 'Paperboard', hardness: 1 },
  { name: 'Cork', hardness: 1 },
  { name: 'Reinforced Fiber', hardness: 3 },
  { name: 'Elastic Film', hardness: 1 },
  { name: 'Flexible PVC', hardness: 2 },
  { name: 'Iron Sheet', hardness: 3 },
  { name: 'Fiberglass Panel', hardness: 2 },
  { name: 'High-Impact Plastic', hardness: 2 },
  { name: 'Rubber Sheet', hardness: 1 },
  { name: 'Thin Aluminum', hardness: 3 },
  { name: 'Polyester Film', hardness: 1 },
  { name: 'Laminate Board', hardness: 2 },
  { name: 'Ceramic Coating', hardness: 3 },
  { name: 'Dense Foam', hardness: 2 },
];

const mockColors = [
  { name: 'Crimson Red', intensity: 5 },
  { name: 'Royal Blue', intensity: 4 },
  { name: 'Emerald Green', intensity: 3 },
  { name: 'Sunshine Yellow', intensity: 2 },
  { name: 'Tangerine', intensity: 1 },
  { name: 'Deep Purple', intensity: 5 },
  { name: 'Onyx Black', intensity: 3 },
  { name: 'Snow White', intensity: 1 },
  { name: 'Graphite Gray', intensity: 4 },
  { name: 'Aqua Teal', intensity: 2 },
  { name: 'Fuchsia Pink', intensity: 5 },
  { name: 'Blush Rose', intensity: 3 },
  { name: 'Chestnut Brown', intensity: 2 },
  { name: 'Golden Amber', intensity: 4 },
  { name: 'Silver Frost', intensity: 3 },
  { name: 'Lavender Mist', intensity: 2 },
  { name: 'Cobalt Blue', intensity: 4 },
  { name: 'Burnt Orange', intensity: 1 },
  { name: 'Mint Green', intensity: 2 },
  { name: 'Scarlet Flame', intensity: 5 },
];

const mockPacks = [
  { name: 'Standard Box', type: 1 },
  { name: 'Heavy-Duty Box', type: 2 },
  { name: 'Plastic Crate', type: 3 },
  { name: 'Eco-Friendly Bag', type: 4 },
  { name: 'Thermal Wrap', type: 5 },
  { name: 'Cardboard Tube', type: 1 },
  { name: 'Metal Drum', type: 2 },
  { name: 'Vacuum Sealed Pack', type: 3 },
  { name: 'Glass Jar', type: 4 },
  { name: 'Multi-Layer Film', type: 5 },
  { name: 'Plastic Pouch', type: 1 },
  { name: 'Reinforced Roll', type: 2 },
  { name: 'Bubble Mailer', type: 3 },
  { name: 'Insulated Tote', type: 4 },
  { name: 'Wooden Crate', type: 5 },
];

const mockProducts = [
  { name: 'Packing Tape', description: 'Strong adhesive tape for securing packages', price: 10 },
  { name: 'Stretch Film', description: 'Durable film for pallet wrapping', price: 25 },
  { name: 'Bubble Wrap Roll', description: 'Cushioned wrap for fragile items', price: 40 },
  { name: 'Corrugated Box', description: 'Standard shipping box', price: 15 },
  { name: 'Thermal Insulated Bag', description: 'Keeps contents cool or warm', price: 30 },
  { name: 'Pallet Cover', description: 'Protective cover for pallets', price: 20 },
  { name: 'Foam Sheets', description: 'Padding material for protection', price: 35 },
  { name: 'Plastic Straps', description: 'Securing straps for heavy packages', price: 12 },
  { name: 'Sealing Machine', description: 'Efficient machine for sealing bags', price: 150 },
  { name: 'Wooden Pallet', description: 'Durable pallet for freight', price: 50 },
  { name: 'Label Stickers', description: 'Customizable stickers for packaging', price: 8 },
  { name: 'Shrink Wrap', description: 'Tight wrap for bundling items', price: 18 },
  { name: 'Protective Gloves', description: 'Durable gloves for packaging tasks', price: 12 },
  { name: 'Packaging Foam Peanuts', description: 'Void filler for boxes', price: 15 },
  { name: 'Steel Strapping', description: 'Heavy-duty strapping material', price: 45 },
];

// Helper function to generate sequential dates based on today's date
const getSequentialDate = (baseDate, index, intervalInDays = 1) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + index * intervalInDays);
  return date;
};

// Create mock data with today's date as the base
const createMockData = async (userId) => {
  const baseDate = new Date();
  baseDate.setMonth(baseDate.getMonth() - 1);
  // Insert Materials
  const materials = await Material.insertMany(
    mockMaterials.map((material, index) => ({
      ...material,
      user: userId,
      createdAt: getSequentialDate(baseDate, index),
      updatedAt: getSequentialDate(baseDate, index),
    }))
  );

  // Insert Colors
  const colors = await Color.insertMany(
    mockColors.map((color, index) => ({
      ...color,
      user: userId,
      createdAt: getSequentialDate(baseDate, index),
      updatedAt: getSequentialDate(baseDate, index),
    }))
  );

  // Insert Packs
  const packs = await Pack.insertMany(
    mockPacks.map((pack, index) => ({
      ...pack,
      user: userId,
      createdAt: getSequentialDate(baseDate, index),
      updatedAt: getSequentialDate(baseDate, index),
    }))
  );

  // Insert Products
  await Product.insertMany(
    mockProducts.map((product, index) => ({
      ...product,
      material: materials[index % materials.length]._id,
      color: colors[index % colors.length]._id,
      pack: packs[index % packs.length]._id,
      user: userId,
      createdAt: getSequentialDate(baseDate, index),
      updatedAt: getSequentialDate(baseDate, index),
    }))
  );

  console.log('Mock data successfully inserted with current dates!');
};

module.exports = { createMockData };
