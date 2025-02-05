// Get references to important DOM elements
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCartButton = document.getElementById("clearCartButton");
const placeOrderButton = document.getElementById("PlaceOrdertButton");
const saveCustomerDetailsButton = document.getElementById("saveCustomerDetails");
const searchButton = document.getElementById("searchButton");

let cart = []; // Array to store cart items

// Function to update the cart display
function updateCartDisplay() {
  cartItems.innerHTML = ""; // Clear the current cart display
  let totalAmount = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <tr>
        <td colspan="4" style="padding: 10px; border: 1px solid #ccc; text-align: center;">No items in the cart</td>
      </tr>
    `;
  } else {
    cart.forEach((item, index) => {
      totalAmount += item.totalPrice;
      cartItems.innerHTML += `
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;">${item.name}</td>
          <td style="padding: 10px; border: 1px solid #ccc;">${item.quantity}</td>
          <td style="padding: 10px; border: 1px solid #ccc;">₹${item.unitPrice}</td>
          <td style="padding: 10px; border: 1px solid #ccc;">₹${item.totalPrice}</td>
        </tr>
      `;
    });
  }

  cartTotal.textContent = totalAmount.toFixed(2);
}

// Function to add product to the cart
document.querySelectorAll(".addCartButton").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productElement = event.target.closest(".product");
    const productName = productElement.dataset.name;
    const productPrice = parseFloat(productElement.dataset.price);
    const quantityInput = productElement.querySelector("input[type='number']");
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
      const existingItem = cart.find((item) => item.name === productName);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
      } else {
        cart.push({
          name: productName,
          quantity: quantity,
          unitPrice: productPrice,
          totalPrice: quantity * productPrice,
        });
      }

      quantityInput.value = ""; // Clear input field
      updateCartDisplay();
    } else {
      alert("Please enter a valid quantity!");
    }
  });
});

// Function to clear the cart
clearCartButton.addEventListener("click", () => {
  cart = [];
  updateCartDisplay();
});

// Function to place an order
placeOrderButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items to the cart before placing an order.");
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const customerAddress = document.getElementById("customerAddress").value.trim();
  const customerNumber = document.getElementById("customerNumber").value.trim();

  if (!customerName || !customerAddress || !customerNumber) {
    alert("Please fill in your customer details before placing an order.");
    return;
  }

  let orderDetails = `Order Details:\nName: ${customerName}\nAddress: ${customerAddress}\nMobile: ${customerNumber}\n`;
  orderDetails += `\nProducts:\n`;

  cart.forEach((item) => {
    orderDetails += `${item.name} - ${item.quantity}kg @ ₹${item.unitPrice}/kg = ₹${item.totalPrice}\n`;
  });

  orderDetails += `\nTotal Amount: ₹${cartTotal.textContent}`;

  // Encode the message for WhatsApp URL
  const whatsappMessage = encodeURIComponent(orderDetails);
  const whatsappLink = `https://wa.me/+918208195103?text=${whatsappMessage}`;

  // Open the WhatsApp link
  window.open(whatsappLink, "_blank");

  // Clear the cart
  cart = [];
  updateCartDisplay();
});

// Function to save customer details
saveCustomerDetailsButton.addEventListener("click", () => {
  const customerName = document.getElementById("customerName").value.trim();
  const customerAddress = document.getElementById("customerAddress").value.trim();
  const customerNumber = document.getElementById("customerNumber").value.trim();

  if (!customerName || !customerAddress || !customerNumber) {
    alert("Please fill in all fields.");
    return;
  }

  alert("Customer details saved successfully!");
});

// Function for product search
searchButton.addEventListener("click", () => {
  const searchQuery = document.getElementById("searchBar").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    const productName = product.dataset.name.toLowerCase();
    if (productName.includes(searchQuery)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// JavaScript code for handling "Details" button functionality

document.addEventListener("DOMContentLoaded", () => {
  // Attach click event to all details buttons
  const detailButtons = document.querySelectorAll(".detailsButton");

  detailButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productDiv = event.target.closest(".product");
      const productName = productDiv.dataset.name;

      let details = "";

      switch (productName) {
        case "Amino Acids 80% Powder":
          details = `Amino Acids 80%\n\nAmino Acids 80% typically refers to a concentrated powder or liquid containing amino acids derived from sources like soy protein, animal protein, or enzymatically hydrolyzed proteins. These products are often used in agriculture as bio-stimulants, fertilizers, or for animal feed supplements.\n\nComposition\nContent: 80% total amino acids (w/w), derived from hydrolyzed protein.\nAppearance: Light yellow to brown powder or liquid, soluble in water.\nAmino Acid Types: Contains both free and combined forms of amino acids, including:\n  - Glycine\n  - Alanine\n  - Glutamic acid\n  - Aspartic acid\n  - Lysine\n  - Proline\n  - Others, depending on the source.\n\nAgricultural Uses:\n- Plant Growth Promotion: Enhances plant metabolism and chlorophyll synthesis. Improves nutrient absorption and photosynthesis efficiency.\n- Stress Resistance: Increases resistance to drought, salinity, and temperature stress. Reduces crop shock from pesticides and herbicides.\n- Fertilizer Enhancer: Can chelate micronutrients (e.g., zinc, iron, calcium) for better bioavailability.\n\nApplication:\n- Recommended Dosage: 500-1000g per hectare (foliar spray).\n- Mixing: Compatible with most fertilizers and pesticides.\n- Methods: Spray, drip irrigation, or root feeding.\n\nAdvantages:\n- Boosts growth and yield.\n- Enhances soil microbe activity.\n- Improves the quality of fruits, vegetables, and other crops.`;
          break;
          
        case "Sulfur Powder":
    details = `General Details:
Sulfur powder is a fine, yellow, crystalline substance derived from naturally occurring sulfur deposits. It is widely used in agriculture and industry due to its fungicidal, pesticidal, and soil-enhancing properties.

Composition:
Sulfur powder primarily consists of elemental sulfur (S), a naturally occurring element that is vital for plant growth and soil health.

Agricultural Uses:
- Soil Conditioner: Improves soil acidity for crops requiring lower pH levels (e.g., blueberries, strawberries, and citrus).
- Fungicide: Controls powdery mildew, rust, and other fungal diseases in crops like grapes, apples, and vegetables.
- Pesticide: Effective against mites, insects, and certain pests.
- Nutrient Source: Supplies sulfur, an essential nutrient for crops to synthesize proteins and enzymes.

Application:
- Soil Treatment: Can be broadcasted or incorporated into the soil to lower pH.
- Foliar Spray: Mixed with water for use as a spray to combat fungal diseases.
- Dusting: Applied as a dust on crops to control pests and diseases.
- Blended Fertilizers: Added to fertilizers for enhanced nutrient delivery.

Advantages:
- Improves soil health and fertility.
- Cost-effective and versatile in its uses.
- Non-toxic to crops and beneficial when used appropriately.
- Eco-friendly alternative to synthetic fungicides and pesticides.`;
     break;
    
  case "Potassium Fulvic Acids 80% Powder":
    details = `General Details:
Potassium Fulvic Acids 80% Powder is a highly concentrated organic material derived from natural plant or mineral sources. It is widely recognized for its superior ability to enhance soil quality, improve nutrient uptake, and promote healthy plant growth. This soluble powder is ideal for sustainable agriculture practices.

Composition:
- Fulvic Acid: 80%
- Potassium (K2O): Essential potassium in bioavailable form.
- Trace Minerals and Micro-nutrients: Naturally present in fulvic acid.

Agricultural Uses:
- Soil Amendment: Enhances soil structure and microbial activity, improving overall fertility.
- Nutrient Enhancer: Boosts the availability and absorption of essential nutrients like nitrogen, phosphorus, and potassium.
- Plant Growth Stimulator: Promotes cell division, root elongation, and overall plant vigor.
- Stress Resistance: Helps plants withstand environmental stress such as drought, salinity, and extreme temperatures.

Application:
- Soil Application: Mix with water and apply directly to the soil to improve fertility and nutrient uptake.
- Foliar Spray: Dilute and spray on leaves to enhance nutrient absorption and reduce nutrient deficiencies.
- Seed Treatment: Coating seeds with a fulvic acid solution to improve germination rates and seedling growth.
- Irrigation Systems: Suitable for drip and sprinkler irrigation for efficient distribution.

Advantages:
- Increases nutrient efficiency, reducing fertilizer waste.
- Improves soil aeration, water retention, and microbial activity.
- Enhances root development and overall crop yield.
- Environmentally friendly and compatible with organic farming practices.
- Easy to dissolve and apply across different farming systems.`;
    break;

     case "Chelated Mix Micronutrients EDTA Powder":
    details = `General Details:
Chelated Mix Micronutrients EDTA Powder is a premium-grade, water-soluble fertilizer designed to provide essential micronutrients to plants in a bioavailable form. The chelation process ensures that the nutrients remain stable and easily absorbed by plants, even in alkaline or challenging soil conditions. It is widely used in modern agriculture to prevent and correct micronutrient deficiencies.

Composition:
- Iron (Fe): 5-10% (EDTA-chelated)
- Zinc (Zn): 4-6% (EDTA-chelated)
- Copper (Cu): 1-2% (EDTA-chelated)
- Manganese (Mn): 3-5% (EDTA-chelated)
- Boron (B): 0.5-1%
- Molybdenum (Mo): 0.1-0.2%

Agricultural Uses:
- Nutrient Supply: Provides essential micronutrients that support plant metabolic processes such as photosynthesis, respiration, and enzyme activation.
- Deficiency Correction: Effectively treats micronutrient deficiencies like iron chlorosis or zinc deficiency.
- Improved Crop Yield: Enhances plant growth, flowering, and fruit development.
- Soil Enrichment: Suitable for soils with poor nutrient availability due to high pH or salinity.

Application:
- Soil Application: Can be broadcasted or applied directly to the root zone.
- Foliar Spray: Dissolve in water and spray onto plant leaves for rapid uptake and correction of deficiencies.

- Fertigation: Ideal for use in irrigation systems such as drip or sprinkler irrigation.
- Hydroponics: Can be mixed into nutrient solutions for soilless cultivation systems.

Advantages:
- Provides a balanced mix of all essential micronutrients in a chelated form for better absorption.
- Compatible with most fertilizers and agricultural chemicals.
- Improves crop quality, yield, and resistance to stress.
- Easy to use, highly soluble, and efficient in all types of soils and growing conditions.
- Reduces the risk of nutrient precipitation in the soil, ensuring long-term nutrient availability.`;
    break;
          
          case "Micronutrients EDTA Powder":
    details = `General Details:
Micronutrients EDTA Powder is a water-soluble chelated fertilizer that provides essential trace elements to plants in a form that is easily absorbed. The EDTA (ethylenediaminetetraacetic acid) chelation ensures that the nutrients remain stable and available to plants, even in soils with high pH or salinity. It is commonly used to prevent and treat deficiencies in crops, enhancing overall growth and productivity.

Composition:
- Iron (Fe): 10-15% (EDTA-chelated)
- Zinc (Zn): 5-10% (EDTA-chelated)
- Copper (Cu): 2-5% (EDTA-chelated)
- Manganese (Mn): 3-7% (EDTA-chelated)
- Boron (B): 0.5-2%
- Molybdenum (Mo): 0.1-0.5%

Agricultural Uses:
- Micronutrient Supply: Provides plants with vital trace elements required for growth, photosynthesis, and enzyme functions.
- Deficiency Correction: Corrects specific nutrient deficiencies that may hinder crop development, such as iron chlorosis or zinc deficiency.
- Yield Improvement: Promotes healthy growth, better flowering, and higher fruit/seed production.
- Stress Resistance: Enhances the plant’s ability to withstand environmental stresses like drought, heat, and salinity.

Application:
- Soil Application: Can be directly applied to the soil to enrich the root zone with essential micronutrients.
- Foliar Spray: Mix with water and spray onto the leaves for quick absorption and immediate correction of deficiencies.
- Fertigation: Suitable for use in drip or sprinkler irrigation systems for even nutrient distribution.
- Hydroponics: Easily incorporated into nutrient solutions for soilless cultivation systems.

Advantages:
- EDTA chelation ensures high stability and bioavailability of nutrients.
- Effective across a wide range of soil types, including alkaline and saline soils.
- Promotes balanced growth and prevents nutrient-related disorders.
- Completely water-soluble, easy to handle, and apply.
- Compatible with most fertilizers and pesticides.
- Environmentally safe and suitable for sustainable agricultural practices.`;
    break;

          case "Ferrous Chelated 12% EDTA Powder":
    details = `General Details:
Ferrous Chelated 12% EDTA Powder is a highly effective, water-soluble source of iron (Fe) for agricultural use. The chelation process using EDTA (ethylenediaminetetraacetic acid) ensures that iron remains stable and bioavailable to plants, even in alkaline or calcareous soils where iron is typically less accessible. It plays a crucial role in preventing and treating iron chlorosis, a common nutrient deficiency in crops.

Composition:
- Iron (Fe): 12% (EDTA-chelated)

Agricultural Uses:
- Iron Supplement: Provides a readily available source of iron, essential for chlorophyll synthesis and photosynthesis.
- Deficiency Correction: Effectively treats iron deficiency (iron chlorosis) that causes yellowing of leaves and poor growth.
- Crop Improvement: Enhances plant vigor, leaf greening, and overall yield.
- Soil and Foliar Application: Suitable for both soil and foliar application in various crops, including fruits, vegetables, cereals, and ornamentals.

Application:
- Soil Application: Mix with water and apply near the root zone for efficient uptake. Ideal for alkaline or calcareous soils.
- Foliar Spray: Dissolve in water and spray on plant leaves for quick absorption and correction of iron deficiency symptoms.
- Fertigation: Compatible with drip and sprinkler irrigation systems, ensuring uniform distribution.
- Hydroponics: Can be added to nutrient solutions for use in soilless cultivation.

Advantages:
- High Bioavailability: EDTA chelation keeps iron stable and easily absorbable by plants.
- Wide Soil Compatibility: Effective even in challenging soils with high pH or salinity.
- Fast Acting: Quickly alleviates symptoms of iron deficiency, promoting healthy plant growth.
- Water Soluble: Fully soluble for ease of application through multiple methods.
- Environmentally Friendly: Reduces iron runoff and leaching, minimizing environmental impact.
- Improved Plant Health: Supports robust growth, better chlorophyll production, and higher crop yields.`;
    break;
         
          case "Zinc Chelated 12% EDTA Powder":
    details = `General Details:
Zinc Chelated 12% EDTA Powder is a high-quality, water-soluble micronutrient fertilizer designed to provide plants with readily available zinc. The chelation process with EDTA (ethylenediaminetetraacetic acid) ensures zinc remains stable and bioavailable, even in alkaline or saline soils where traditional zinc sources may be ineffective. Zinc is essential for plant enzymatic processes, growth regulation, and chlorophyll production.

Composition:
- Zinc (Zn): 12% (EDTA-chelated)

Agricultural Uses:
- Zinc Supplement: Supplies zinc, a critical nutrient for plant growth, enzyme activity, and hormone production.
- Deficiency Correction: Effectively treats zinc deficiencies that cause stunted growth, reduced leaf size, interveinal chlorosis, and delayed maturity.
- Crop Enhancement: Promotes higher yields, better fruit quality, and overall plant health.
- Adaptable Application: Suitable for use in soil, foliar spray, fertigation, and hydroponics.

Application:
- Soil Application: Mix with water and apply near the root zone to supply zinc directly to the plant's root system.
- Foliar Spray: Dissolve in water and spray onto leaves for rapid absorption and quick correction of zinc deficiency symptoms.
- Fertigation: Compatible with drip or sprinkler irrigation systems for efficient and uniform distribution.
- Hydroponics: Can be added to nutrient solutions in soilless cultivation systems.

Advantages:
- High Bioavailability: Zinc remains stable and available for plant uptake, even in challenging soil conditions.
- Prevents and Corrects Deficiencies: Rapidly addresses zinc deficiency symptoms like stunted growth and yellowing leaves.
- Fully Soluble: Easily dissolves in water, making it simple to apply in various systems.
- Wide Soil Compatibility: Effective in acidic, alkaline, and saline soils.
- Improves Plant Growth: Enhances photosynthesis, enzyme activity, and overall plant development.
- Environmentally Friendly: Reduces zinc runoff and ensures efficient nutrient use.
- Versatile: Suitable for a variety of crops, including cereals, fruits, vegetables, and ornamentals.`;
    break;
          
         case "Boron 20% Powder":
    details = `General Details:
Boron 20% Powder is a concentrated, water-soluble fertilizer specifically designed to provide plants with essential boron. This micronutrient plays a critical role in cell wall development, nutrient transportation, flowering, and fruiting. It is widely used in agriculture to correct boron deficiencies and enhance crop quality and yield.

Composition:
- Boron (B): 20%

Agricultural Uses:
- Boron Supplement: Provides an essential micronutrient required for healthy plant growth, particularly for cell wall strength and reproductive development.
- Deficiency Correction: Corrects boron deficiencies that lead to issues such as hollow stems, brittle leaves, and poor fruit/seed development.
- Crop Quality Enhancement: Improves flowering, pollination, fruit set, and seed production in crops.
- Soil and Foliar Applications: Suitable for a wide range of crops, including vegetables, fruits, oilseeds, and cereals.

Application:
- Soil Application: Mix with soil or apply in solution form to the root zone for efficient absorption. Ideal for boron-deficient soils.
- Foliar Spray: Dissolve in water and spray on plant leaves for quick uptake and correction of boron deficiency symptoms.
- Fertigation: Compatible with irrigation systems like drip or sprinkler systems for even nutrient distribution.

Advantages:
- High Boron Concentration: Ensures effective and efficient correction of boron deficiencies.
- Improves Plant Health: Promotes cell wall integrity, nutrient movement, and reproductive growth.
- Enhances Crop Yield: Increases flowering, fruit set, and overall quality of produce.
- Water Soluble: Fully dissolves in water, making it easy to apply through various methods.
- Wide Compatibility: Effective in diverse soil types and agricultural systems.
- Versatile: Suitable for a wide variety of crops, including horticultural, field, and industrial crops.
- Cost-Effective: Highly concentrated formulation reduces the amount required per application.`;
    break;
          
         case "Potassium Humate Shiny Flakes 98%":
    details = `General Details:
Potassium Humate Shiny Flakes 98% is a highly concentrated organic soil conditioner and plant growth stimulant derived from natural leonardite. It is rich in humic and fulvic acids, which enhance soil structure, improve nutrient availability, and promote healthy plant growth. The shiny flakes are 100% water-soluble, making them ideal for various agricultural and horticultural applications.

Composition:
- Humic Acid: 70-80%
- Fulvic Acid: 10-15%
- Potassium (K2O): 12-15%
- Water Solubility: 98-100%

Agricultural Uses:
- Soil Conditioner: Improves soil structure, water retention, and aeration.
- Nutrient Availability: Enhances the absorption of nitrogen, phosphorus, potassium, and micronutrients.
- Plant Growth Promoter: Stimulates root development, seed germination, and overall plant vigor.
- Stress Resistance: Improves plant tolerance to drought, salinity, and environmental stress.
- Sustainable Agriculture: Promotes soil microbial activity and long-term soil health.

Application:
- Soil Application: Mix with soil or apply in solution form to enrich the root zone. Ideal for improving soil fertility.
- Foliar Spray: Dissolve in water and spray on leaves for better nutrient uptake and enhanced photosynthesis.
- Fertigation: Suitable for drip or sprinkler irrigation systems for even distribution across the field.
- Seed Treatment: Coating seeds with a humate solution improves germination rates and seedling development.
- Hydroponics: Can be used in nutrient solutions for soilless farming systems.

Advantages:
- High Potassium Content: Supplies plants with essential potassium, promoting better flowering and fruiting.
- Boosts Nutrient Efficiency: Enhances the uptake and utilization of fertilizers, reducing wastage.
- Water Soluble: Fully dissolves in water for easy and efficient application.
- Eco-Friendly: Improves soil fertility and health without harming the environment.
- Cost-Effective: High concentration reduces the required application rate, making it economical for large-scale use.
- Improves Crop Yield: Supports healthy growth, increases yield, and enhances crop quality.
- Versatile: Suitable for a wide range of crops, including cereals, fruits, vegetables, and ornamentals.`;
    break;
         
          case "Calcium Nitrate":
    details = `General Details:
Calcium Nitrate is a water-soluble, inorganic fertilizer that provides essential nutrients to plants in the form of calcium and nitrogen. It is highly effective in improving plant health, promoting robust growth, and preventing nutrient deficiencies. Calcium Nitrate is widely used in agriculture and horticulture due to its quick nutrient availability and compatibility with various crops and soil types.

Composition:
- Calcium (Ca): 18-19%
- Nitrogen (N): 15.5% (in nitrate form)

Agricultural Uses:
- Calcium Supplement: Provides calcium for cell wall strength, reducing physiological disorders like blossom-end rot in tomatoes, peppers, and cucumbers.
- Nitrogen Source: Supplies nitrate nitrogen, which is readily absorbed by plants and promotes vegetative growth.
- Improved Crop Quality: Enhances fruit firmness, shelf life, and overall crop quality.
- Soil Structure Improvement: Helps in reducing soil salinity and improving soil structure.
- Stress Resistance: Supports plant resistance to stress factors like drought and temperature fluctuations.

Application:
- Soil Application: Can be directly applied to the soil or mixed with other fertilizers to supply calcium and nitrogen to the root zone.
- Foliar Spray: Dissolve in water and spray on plant foliage for rapid absorption and correction of calcium and nitrogen deficiencies.
- Fertigation: Ideal for use in drip or sprinkler irrigation systems for uniform nutrient distribution.
- Hydroponics: Used as a key component in nutrient solutions for soilless cultivation systems.

Advantages:
- Quick Nutrient Availability: Provides calcium and nitrogen in forms that are immediately available for plant uptake.
- Prevents Deficiencies: Effectively addresses calcium and nitrate nitrogen deficiencies that can harm plant health and yield.
- Improves Crop Quality: Enhances fruit size, firmness, and shelf life.
- Enhances Soil Health: Helps reduce soil salinity and balances soil pH levels.
- Versatile Usage: Suitable for a wide range of crops, including fruits, vegetables, ornamentals, and cereals.
- Highly Soluble: Fully dissolves in water, making it easy to use in various application methods.
- Eco-Friendly: Promotes sustainable farming by reducing nutrient leaching and improving fertilizer efficiency.`;
    break;
          
          case "Green Seaweeds Extracts Powder":
    details = `General Details:
Green Seaweeds Extracts Powder is a natural, organic plant growth enhancer derived from sustainably harvested green seaweed. It is rich in bioactive compounds, minerals, amino acids, and plant hormones such as cytokinins and auxins, which stimulate plant growth and development. Known for its environmental benefits, it supports sustainable farming practices while improving soil and crop health.

Composition:
- Seaweed Extracts: 95-98%
- Minerals: Magnesium, calcium, and potassium
- Plant Hormones: Cytokinins, auxins, and gibberellins
- Amino Acids: Essential amino acids for plant metabolism
- Organic Matter: 50-70%

Agricultural Uses:
- Plant Growth Stimulation: Promotes root and shoot growth through natural plant hormones.
- Stress Resistance: Helps plants withstand environmental stresses like drought, heat, and salinity.
- Nutrient Enhancement: Improves the absorption of macronutrients and micronutrients.
- Soil Conditioning: Enriches soil fertility and microbial activity.
- Flowering and Fruiting: Enhances flower and fruit set, improving overall yield and quality.

Application:
- Soil Application: Mix with soil or apply as a drench to improve soil fertility and support root growth.
- Foliar Spray: Dissolve in water and spray onto plant leaves for rapid absorption and nutrient uptake.
- Seed Treatment: Coat seeds with a seaweed extract solution to boost germination and early growth.
- Fertigation: Suitable for drip or sprinkler irrigation systems for uniform application across fields.
- Hydroponics: Add to nutrient solutions for use in soilless cultivation systems.

Advantages:
- Organic and Natural: Derived from green seaweeds, it is environmentally friendly and safe for use in organic farming.
- Boosts Plant Immunity: Strengthens plants against pests, diseases, and environmental stressors.
- Enhances Crop Quality: Improves fruit size, flavor, color, and shelf life.
- Improves Soil Health: Increases microbial activity and soil fertility over time.
- Highly Soluble: Easily dissolves in water for convenient application.
- Versatile: Suitable for a wide variety of crops, including vegetables, fruits, cereals, and ornamentals.
- Sustainable Farming: Promotes eco-friendly and sustainable agricultural practices.`;
    break;
          
          case "00:00:50":
    details = `General Details:
00:00:50 is a water-soluble fertilizer with a high concentration of potassium (K). It is widely used as a specialized fertilizer for crops requiring higher potassium levels during specific growth stages, such as flowering and fruiting. With no nitrogen or phosphorus content, it ensures targeted potassium supplementation without altering other nutrient balances in the soil.

Composition:
- Potassium (K2O): 50%
- Nitrogen (N): 0%
- Phosphorus (P2O5): 0%
- Water Solubility: 100%

Agricultural Uses:
- Potassium Supplement: Provides a rich source of potassium, essential for enzyme activation, water regulation, and carbohydrate transport in plants.
- Yield Improvement: Enhances fruit size, weight, color, and sugar content, resulting in better quality and yield.
- Stress Tolerance: Improves plant resistance to abiotic stresses like drought, salinity, and heat.
- Targeted Application: Suitable for use during flowering and fruiting stages, when potassium demand is high.

Application:
- Soil Application: Apply directly to the soil or in solution form for better root absorption.
- Foliar Spray: Dissolve in water and spray on plant leaves for rapid nutrient uptake and immediate correction of potassium deficiencies.
- Fertigation: Ideal for use in drip or sprinkler irrigation systems for uniform and efficient nutrient delivery.
- Hydroponics: Easily incorporated into nutrient solutions for soilless cultivation systems.

Advantages:
- High Potassium Content: Delivers a concentrated dose of potassium for optimal plant growth and development.
- No Nitrogen or Phosphorus: Provides targeted potassium supplementation without altering the soil's nutrient balance.
- Fully Water-Soluble: Dissolves completely in water for ease of use and efficient application.
- Improves Crop Quality: Enhances fruit size, color, flavor, and shelf life.
- Wide Crop Compatibility: Suitable for a variety of crops, including fruits, vegetables, cereals, and ornamentals.
- Boosts Stress Resistance: Strengthens plants' ability to withstand environmental stresses.
- Eco-Friendly: Reduces nutrient wastage and supports sustainable farming practices.`;
    break;
          
          case "19:19:19":
    details = `General Details:
19:19:19 is a balanced, water-soluble NPK (Nitrogen, Phosphorus, Potassium) fertilizer designed to provide equal proportions of essential macronutrients. It is highly effective for general crop nutrition and promotes healthy growth during all stages of plant development. Its balanced formulation makes it versatile and suitable for a wide range of crops, ensuring optimal growth and yield.

Composition:
- Nitrogen (N): 19%
- Phosphorus (P2O5): 19%
- Potassium (K2O): 19%
- Water Solubility: 100%

Agricultural Uses:
- General Fertilization: Provides balanced nutrition for plants during all growth stages.
- Growth Enhancement: Supports root development, leaf growth, flowering, and fruiting.
- Improves Soil Fertility: Supplies essential nutrients for maintaining soil health and productivity.
- Crop Yield Improvement: Boosts overall plant vigor and productivity, enhancing yield and quality.

Application:
- Soil Application: Apply directly to the soil or mix in water for uniform distribution near the root zone.
- Foliar Spray: Dissolve in water and spray on plant leaves for quick absorption and immediate results.
- Fertigation: Ideal for use in drip or sprinkler irrigation systems, ensuring efficient nutrient delivery to plants.
- Hydroponics: Compatible with soilless cultivation, providing balanced nutrition in nutrient solutions.

Advantages:
- Balanced Nutrition: Provides equal proportions of nitrogen, phosphorus, and potassium for comprehensive plant growth.
- Highly Soluble: Fully dissolves in water, ensuring easy application and efficient nutrient uptake.
- Versatile: Suitable for all crops, including cereals, fruits, vegetables, ornamentals, and turf.
- Enhances Crop Quality: Promotes uniform growth, better fruiting, and improved produce quality.
- Improves Root and Shoot Development: Supports healthy plant development, leading to higher yields.
- Eco-Friendly: Reduces nutrient leaching and ensures maximum nutrient use efficiency.
- Convenient: Can be applied using various methods like soil, foliar, and fertigation, catering to different farming needs.`;
    break;
          
          case "20:20:20":
    details = `General Details:
20:20:20 is a fully water-soluble, balanced NPK (Nitrogen, Phosphorus, Potassium) fertilizer designed to meet the nutritional needs of plants during all stages of growth. Its balanced composition ensures optimal development, making it suitable for a wide range of crops. It dissolves completely in water, allowing for efficient application through foliar spray, fertigation, or hydroponics.

Composition:
- Nitrogen (N): 20%
- Phosphorus (P2O5): 20%
- Potassium (K2O): 20%
- Water Solubility: 100%

Agricultural Uses:
- General Plant Nutrition: Supplies all three essential macronutrients in equal proportions for balanced plant growth.
- Crop Growth Enhancement: Boosts vegetative growth, root development, flowering, and fruiting.
- Deficiency Correction: Addresses deficiencies of nitrogen, phosphorus, and potassium in soils and plants.
- Versatility: Ideal for a variety of crops, including vegetables, fruits, cereals, ornamentals, and turfgrass.

Application:
- Soil Application: Can be applied directly to the soil or dissolved in water for uniform nutrient distribution in the root zone.
- Foliar Spray: Dissolve in water and spray on plant leaves for quick nutrient uptake and immediate results.
- Fertigation: Suitable for use in drip or sprinkler irrigation systems for efficient delivery of nutrients.
- Hydroponics: An excellent choice for nutrient solutions in soilless cultivation systems.

Advantages:
- Balanced Nutrition: Provides equal proportions of nitrogen, phosphorus, and potassium for comprehensive plant health and growth.
- Highly Soluble: Completely dissolves in water, ensuring ease of use and efficient absorption by plants.
- Wide Compatibility: Suitable for all crops and growth stages, from vegetative to reproductive phases.
- Enhances Plant Health: Promotes better root development, greener foliage, and improved flowering and fruiting.
- Increases Yield and Quality: Leads to higher productivity and superior crop quality.
- Flexible Application Methods: Can be used in soil, foliar, fertigation, and hydroponic systems.
- Eco-Friendly: Reduces nutrient wastage through efficient delivery and uptake.`;
    break;
          
          case "13:40:13":
    details = `General Details:
13:40:13 is a water-soluble fertilizer with a unique NPK (Nitrogen, Phosphorus, Potassium) ratio of 13% nitrogen, 40% phosphorus, and 13% potassium. This formulation is designed to provide plants with balanced nutrition, particularly during stages requiring high phosphorus levels such as root development, flowering, and fruiting. It promotes strong root systems, enhances crop quality, and supports both vegetative and reproductive growth.

Composition:
- Nitrogen (N): 13%
- Phosphorus (P2O5): 40%
- Potassium (K2O): 13%
- Water Solubility: 100%

Agricultural Uses:
- Phosphorus Supply: Provides a high dose of phosphorus for root development, energy transfer, and flowering.
- Encourages Early Growth: Ideal for crops in early stages of growth, promoting strong root establishment.
- Flowering & Fruiting: Helps boost flower formation, fruit set, and overall yield.
- Improves Soil Fertility: Enhances nutrient availability in the soil for efficient plant uptake.
- Suitable Crops: Works well for vegetables, fruits, cereals, and ornamental plants.

Application:
- Soil Application: Apply to the soil or dissolve in water for balanced nutrient supply to the roots.
- Foliar Spray: Dissolve in water and apply to leaves for quick nutrient uptake, especially during flowering and fruiting.
- Fertigation: Ideal for drip or sprinkler systems, ensuring even nutrient distribution and absorption by plant roots.
- Hydroponics: Can be used in nutrient solutions for soilless systems to provide essential nutrients for plant growth.

Advantages:
- High Phosphorus Content: Delivers an extra boost of phosphorus, vital for root development, flowering, and fruit production.
- Balanced NPK: Supplies nitrogen for growth and potassium for stress resistance.
- Highly Soluble: Completely dissolves in water for easy application and efficient nutrient uptake.
- Supports Early Development: Promotes strong early growth and root system establishment.
- Versatile Use: Suitable for a wide range of crops, including fruits, vegetables, and ornamental plants.
- Improves Crop Yield: Increases flower and fruit set, improving overall yield and quality.
- Flexible Application Methods: Can be applied via soil, foliar spray, fertigation, or hydroponics.`;
    break;
          
          case "13:00:45":
    details = `General Details:
13:00:45 is a water-soluble fertilizer with a unique NPK (Nitrogen, Phosphorus, Potassium) ratio of 13% nitrogen, 0% phosphorus, and 45% potassium. This formulation is specifically designed to provide plants with a high amount of potassium, which is crucial for improving crop quality, fruit set, and overall stress resistance. It is ideal for crops in reproductive stages like flowering and fruiting, or for soils that are already rich in phosphorus but require additional potassium.

Composition:
- Nitrogen (N): 13%
- Phosphorus (P2O5): 0%
- Potassium (K2O): 45%
- Water Solubility: 100%

Agricultural Uses:
- Potassium Supplement: Provides a concentrated source of potassium to improve flower and fruit quality and enhance plant resistance to environmental stresses.
- Improved Fruit and Flowering: Ideal for crops during flowering and fruiting stages, promoting better fruit set, larger fruit size, and enhanced sugar content.
- Stress Resistance: Strengthens plant cell walls, improving tolerance to drought, salinity, and extreme temperatures.
- Suitable Crops: Works well for fruit-bearing crops, vegetables, ornamentals, and turfgrass.

Application:
- Soil Application: Apply directly to soil or mix with water for optimal potassium uptake by the plant’s root system.
- Foliar Spray: Dissolve in water and spray on leaves for rapid potassium absorption, especially during flowering and fruit development.
- Fertigation: Ideal for drip or sprinkler irrigation systems, ensuring even and efficient nutrient distribution.
- Hydroponics: Can be used in nutrient solutions for soilless systems, ensuring balanced potassium nutrition.

Advantages:
- High Potassium Content: Supplies a concentrated source of potassium, supporting flower and fruit development, crop quality, and yield.
- Stress Resistance: Enhances plant resilience to drought, heat, and salinity stress, especially in challenging growing conditions.
- Supports Flowering and Fruiting: Improves fruit size, color, and sugar content, boosting crop value and marketability.
- Highly Soluble: Completely dissolves in water for easy application and maximum nutrient uptake by plants.
- Versatile Application: Suitable for soil, foliar spray, fertigation systems, and hydroponics, adaptable to various farming techniques.
- Improves Crop Yield: Results in higher yield and better-quality produce, particularly for fruits and vegetables.`;
    break;
          
          case "12:61:00":
    details = `General Details:
12:61:00 is a water-soluble fertilizer with a high phosphorus formulation of 12% nitrogen, 61% phosphorus, and 0% potassium. It is specially designed to support the initial stages of plant growth, focusing on enhancing root development, energy transfer, and flower/fruit set. The low nitrogen content makes it ideal for soils that already have sufficient nitrogen but need extra phosphorus to promote early growth or boost reproductive phases.

Composition:
- Nitrogen (N): 12%
- Phosphorus (P2O5): 61%
- Potassium (K2O): 0%
- Water Solubility: 100%

Agricultural Uses:
- Phosphorus Boost: Provides a concentrated dose of phosphorus, crucial for root development, energy transfer, and plant vigor.
- Early Growth Stimulation: Perfect for crops in the early stages, helping establish strong root systems for healthy development.
- Flowering and Fruiting: Supports crops in reproductive stages, enhancing flower formation and fruit set.
- Soil Fertility: Suitable for soils that are phosphorus-deficient, promoting long-term soil fertility.
- Suitable Crops: Works well with vegetables, fruits, and ornamental plants.

Application:
- Soil Application: Apply directly to the soil or dissolve in water for even phosphorus distribution in the root zone.
- Foliar Spray: Dissolve in water and spray on leaves to quickly correct phosphorus deficiencies.
- Fertigation: Perfect for irrigation systems, delivering nutrients directly to the root zone for uniform uptake.
- Hydroponics: Can be incorporated into nutrient solutions for soilless cultivation systems, providing essential phosphorus for growth.

Advantages:
- High Phosphorus Content: A concentrated dose of phosphorus enhances root development, energy transfer, and reproductive success.
- Promotes Strong Roots: Ideal for young plants or those in transplanting stages that require strong roots for better nutrient and water uptake.
- Supports Flowering and Fruiting: Increases flower and fruit set, leading to higher yields.
- Highly Soluble: Easily dissolves in water for quick application and efficient plant uptake.
- Versatile Use: Suitable for a wide range of crops, especially those in early growth stages or transitioning to reproductive phases.
- Enhanced Nutrient Availability: Improves the uptake of other essential nutrients by optimizing root development.`;
    break;
         
          case "00:60:20":
    details = `General Details:
00:60:20 is a highly concentrated water-soluble fertilizer with a formulation of 0% nitrogen, 60% phosphorus, and 20% potassium. This fertilizer is designed to provide crops with a high level of phosphorus, promoting strong root development, and improving flower and fruit set. The potassium helps improve plant stress tolerance, contributing to overall plant health. This formulation is ideal for plants in the flowering and fruiting stages or for soils that need a phosphorus boost.

Composition:
- Nitrogen (N): 0%
- Phosphorus (P2O5): 60%
- Potassium (K2O): 20%
- Water Solubility: 100%

Agricultural Uses:
- Phosphorus Supply: High phosphorus concentration to support root growth, energy transfer, and overall plant vigor.
- Flowering and Fruiting: Ideal for crops in reproductive stages, enhancing flower formation and improving fruit set and size.
- Stress Resistance: The potassium content improves plant tolerance to environmental stresses such as drought, heat, and salinity.
- Soil Fertility: Corrects phosphorus deficiencies in soils, promoting long-term soil health.
- Suitable Crops: Works well for vegetables, fruits, and ornamental plants, especially during flowering and fruiting stages.

Application:
- Soil Application: Apply directly to soil or mix with water for efficient phosphorus uptake by plant roots.
- Foliar Spray: Dissolve in water and spray onto leaves for quick phosphorus absorption.
- Fertigation: Ideal for use in drip or sprinkler systems, delivering nutrients directly to plant roots.
- Hydroponics: Suitable for soilless cultivation systems, ensuring plants receive necessary phosphorus and potassium levels.

Advantages:
- High Phosphorus Content: Significant dose of phosphorus essential for root development, energy transfer, and improved reproductive growth.
- Increased Flower and Fruit Set: Supports better flower formation and fruit set, leading to higher yields.
- Stress Tolerance: Potassium enhances plant resistance to environmental stresses like heat, drought, and salinity.
- Highly Soluble: Fully dissolves in water for easy application and quick nutrient uptake.
- Balanced Nutrients: Potassium supports overall plant health, improving disease resistance and plant vigor.
- Versatile Application Methods: Suitable for soil, foliar, fertigation, and hydroponic systems.`;
    break;
          
          case "00:52:34":
    details = `General Details:
00:52:34 is a specialized, water-soluble fertilizer with a formulation of 0% nitrogen, 52% phosphorus, and 34% potassium. This fertilizer is designed to meet the nutrient demands of plants during their reproductive phases, especially in flowering and fruiting. It provides an excellent source of phosphorus to enhance root development and flower formation, while the potassium aids in stress resistance and improves the overall quality of fruits and flowers.

Composition:
- Nitrogen (N): 0%
- Phosphorus (P2O5): 52%
- Potassium (K2O): 34%
- Water Solubility: 100%

Agricultural Uses:
- Phosphorus Boost: Provides a high concentration of phosphorus for enhanced root development and energy transfer.
- Flower and Fruit Development: Supports better flower formation, fruit set, and improved fruit quality (size, color, and flavor).
- Stress Resistance: Potassium improves plant tolerance to adverse environmental conditions such as drought, heat, and salinity.
- Soil Fertility: Useful in correcting phosphorus deficiencies in soils and ensuring healthy root growth.
- Suitable Crops: Ideal for fruiting and flowering crops, such as vegetables, fruits, ornamental plants, and certain legumes.

Application:
- Soil Application: Apply directly to the soil, either as a top dressing or mixed with irrigation water for even nutrient distribution.
- Foliar Spray: Dissolve in water and spray onto plant leaves for rapid nutrient absorption, especially during flowering and fruiting stages.
- Fertigation: Ideal for use with drip or sprinkler systems, providing consistent nutrient delivery directly to the plant's roots.
- Hydroponics: Suitable for soilless cultivation systems, providing balanced nutrition for crops in controlled environments.

Advantages:
- High Phosphorus Content: Provides essential phosphorus for strong root development, energy transfer, and improved reproductive growth.
- Enhanced Flower and Fruit Formation: Improves flower set and fruit quality, leading to better yield and marketability.
- Improved Stress Tolerance: Potassium helps plants better withstand environmental stresses, including drought, heat, and disease pressure.
- Fully Soluble: Dissolves completely in water, ensuring efficient uptake by plants and preventing clogging in irrigation systems.
- Balanced Nutrition: Potassium enhances stress resistance and contributes to overall plant health and disease resistance.
- Versatile Application Methods: Suitable for use in soil, foliar spraying, fertigation, and hydroponic systems, allowing flexibility in farming practices.`;
    break;
          
          case "Copper Sulfate":
    details = `General Details:
Copper sulfate (CuSO₄) is an inorganic compound widely used in agriculture as a fungicide, herbicide, and soil additive. It is a blue, crystalline substance that provides a source of copper, an essential micronutrient for plant growth. Copper plays a crucial role in various plant processes, including photosynthesis, respiration, and the synthesis of proteins. Copper sulfate is commonly used to correct copper deficiencies in soils and to protect crops from fungal diseases.

Composition:
- Copper (Cu): 25% (as copper sulfate)
- Sulfur (S): 33.5%
- Water Solubility: Soluble in water, ensuring easy application and absorption by plants.

Agricultural Uses:
- Fungicide: Used to control fungal diseases such as downy mildew, powdery mildew, and blight on various crops.
- Fungicide for Seed Treatment: Prevents seedborne diseases by treating seeds before planting.
- Soil Amendments: Used to correct copper deficiencies in soils, especially in crops like cereals, legumes, and vegetables.
- Algaecide: Effective in controlling algae growth in irrigation systems and ponds.
- Animal Feed Additive: Provides copper as a supplement in animal feed, ensuring proper growth and health of livestock.

Application:
- Soil Application: Copper sulfate can be applied directly to the soil to address copper deficiencies. It can be mixed with water or applied as a powder.
- Fungicide Spray: Copper sulfate can be dissolved in water to create a spray for crops, helping control fungal diseases. Common formulations include Bordeaux mixture (copper sulfate and lime).
- Seed Treatment: Copper sulfate is often mixed with water to treat seeds before planting to prevent fungal infections.
- Irrigation Systems: Can be added to irrigation systems to control algae and fungus growth.

Advantages:
- Copper Supplement: Provides an essential micronutrient that helps in photosynthesis, enzyme activation, and overall plant growth.
- Fungicide Action: Protects crops from a wide range of fungal diseases, enhancing plant health and productivity.
- Soil Health: Helps to correct copper deficiencies in soil, promoting balanced nutrient levels for healthy crop growth.
- Effective Against Algae: Can help maintain clean irrigation water and prevent algae growth in agricultural ponds and water systems.
- Economic: Copper sulfate is relatively inexpensive compared to other agricultural chemicals, offering an affordable solution for nutrient deficiencies and disease control.
- Versatile: Suitable for a variety of crops, including fruits, vegetables, cereals, and ornamentals.`;
    break;
          
        default:
          details = `Details about ${productName} are currently unavailable.`;
      }

      // Display the details in a modal or alert box
      alert(details);
    });
  });
});




