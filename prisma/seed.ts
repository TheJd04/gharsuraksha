import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Categories ───────────────────────────────────────────────────

const categories = [
  { name: "Electronics & Appliances", icon: "📺", description: "TVs, ACs, refrigerators, washing machines, and other electronic devices" },
  { name: "Furniture", icon: "🛋️", description: "Sofas, beds, tables, chairs, almirahs, and other furniture" },
  { name: "Kitchen & Cookware", icon: "🍳", description: "Utensils, cookware, gas stove, microwave, and kitchen appliances" },
  { name: "Valuables & Jewelry", icon: "💎", description: "Gold, silver, diamonds, watches, and precious items" },
  { name: "Clothing & Accessories", icon: "👔", description: "Designer wear, sarees, suits, shoes, bags, and accessories" },
  { name: "Computers & Gadgets", icon: "💻", description: "Laptops, phones, tablets, cameras, and tech gadgets" },
  { name: "Home Decor", icon: "🖼️", description: "Paintings, vases, curtains, carpets, and decorative items" },
  { name: "Fitness & Sports", icon: "🏋️", description: "Treadmills, cycles, sports equipment, and fitness gear" },
  { name: "Musical Instruments", icon: "🎸", description: "Guitars, keyboards, tablas, sitars, and music equipment" },
  { name: "Baby & Kids", icon: "🧸", description: "Cribs, strollers, toys, study tables, and children's items" },
  { name: "Garden & Outdoor", icon: "🌿", description: "Garden tools, plants, outdoor furniture, and lawn equipment" },
  { name: "Documents & Important Papers", icon: "📄", description: "Property papers, certificates, passports, and important documents" },
  { name: "Bathroom & Sanitary", icon: "🚿", description: "Geysers, water heaters, bathroom fittings, and sanitary items" },
  { name: "Vehicles & Accessories", icon: "🚗", description: "Car accessories, bike gear, helmets, and vehicle add-ons" },
  { name: "Religious & Puja Items", icon: "🪔", description: "Puja items, idols, silver thali, brass items, and religious artifacts" },
];

// ─── Preset Items (400+ Indian Household Items) ──────────────────

interface PresetItemInput {
  name: string;
  nameHindi?: string;
  category: string;
  defaultValue: number;
  brand?: string;
  description?: string;
}

const presetItems: PresetItemInput[] = [
  // ═══ Electronics & Appliances (80+ items) ═══
  { name: "LED TV 32 inch", nameHindi: "एलईडी टीवी 32 इंच", category: "Electronics & Appliances", defaultValue: 15000, description: "32-inch LED television" },
  { name: "LED TV 43 inch", nameHindi: "एलईडी टीवी 43 इंच", category: "Electronics & Appliances", defaultValue: 28000, description: "43-inch LED television" },
  { name: "LED TV 55 inch", nameHindi: "एलईडी टीवी 55 इंच", category: "Electronics & Appliances", defaultValue: 42000, description: "55-inch 4K LED television" },
  { name: "Smart TV 65 inch", nameHindi: "स्मार्ट टीवी 65 इंच", category: "Electronics & Appliances", defaultValue: 65000, description: "65-inch Smart 4K TV" },
  { name: "Split AC 1 Ton", nameHindi: "स्प्लिट एसी 1 टन", category: "Electronics & Appliances", defaultValue: 32000, description: "1 Ton split air conditioner" },
  { name: "Split AC 1.5 Ton", nameHindi: "स्प्लिट एसी 1.5 टन", category: "Electronics & Appliances", defaultValue: 38000, description: "1.5 Ton split air conditioner" },
  { name: "Split AC 2 Ton", nameHindi: "स्प्लिट एसी 2 टन", category: "Electronics & Appliances", defaultValue: 48000, description: "2 Ton split air conditioner" },
  { name: "Window AC 1.5 Ton", nameHindi: "विंडो एसी 1.5 टन", category: "Electronics & Appliances", defaultValue: 28000, description: "1.5 Ton window air conditioner" },
  { name: "Refrigerator Single Door", nameHindi: "फ्रिज सिंगल डोर", category: "Electronics & Appliances", defaultValue: 14000, description: "Single door refrigerator 190L" },
  { name: "Refrigerator Double Door", nameHindi: "फ्रिज डबल डोर", category: "Electronics & Appliances", defaultValue: 28000, description: "Double door refrigerator 260L" },
  { name: "Refrigerator Side-by-Side", nameHindi: "फ्रिज साइड बाय साइड", category: "Electronics & Appliances", defaultValue: 65000, description: "Side-by-side refrigerator 600L+" },
  { name: "Washing Machine Semi-Auto", nameHindi: "वॉशिंग मशीन सेमी ऑटो", category: "Electronics & Appliances", defaultValue: 12000, description: "Semi-automatic washing machine 7kg" },
  { name: "Washing Machine Fully Auto Top Load", nameHindi: "वॉशिंग मशीन फुली ऑटो टॉप", category: "Electronics & Appliances", defaultValue: 18000, description: "Fully automatic top load 7kg" },
  { name: "Washing Machine Front Load", nameHindi: "वॉशिंग मशीन फ्रंट लोड", category: "Electronics & Appliances", defaultValue: 30000, description: "Front load washing machine 7kg" },
  { name: "Microwave Oven", nameHindi: "माइक्रोवेव ओवन", category: "Electronics & Appliances", defaultValue: 8000, description: "Microwave oven 20-30L" },
  { name: "Convection Oven", nameHindi: "कन्वेक्शन ओवन", category: "Electronics & Appliances", defaultValue: 12000, description: "Convection microwave oven" },
  { name: "OTG Oven", nameHindi: "ओटीजी ओवन", category: "Electronics & Appliances", defaultValue: 6000, description: "Oven Toaster Griller" },
  { name: "Air Cooler", nameHindi: "एयर कूलर", category: "Electronics & Appliances", defaultValue: 8000, description: "Desert / room air cooler" },
  { name: "Tower Fan", nameHindi: "टावर फैन", category: "Electronics & Appliances", defaultValue: 4000, description: "Tower fan" },
  { name: "Ceiling Fan", nameHindi: "सीलिंग फैन", category: "Electronics & Appliances", defaultValue: 2500, description: "Ceiling fan 1200mm" },
  { name: "Table Fan", nameHindi: "टेबल फैन", category: "Electronics & Appliances", defaultValue: 1500, description: "Table fan 400mm" },
  { name: "Exhaust Fan", nameHindi: "एग्जॉस्ट फैन", category: "Electronics & Appliances", defaultValue: 1200, description: "Kitchen/bathroom exhaust fan" },
  { name: "Water Purifier RO", nameHindi: "वाटर प्यूरीफायर आरओ", category: "Electronics & Appliances", defaultValue: 12000, description: "RO water purifier" },
  { name: "Water Purifier UV", nameHindi: "वाटर प्यूरीफायर यूवी", category: "Electronics & Appliances", defaultValue: 6000, description: "UV water purifier" },
  { name: "Vacuum Cleaner", nameHindi: "वैक्यूम क्लीनर", category: "Electronics & Appliances", defaultValue: 8000, description: "Vacuum cleaner" },
  { name: "Robot Vacuum Cleaner", nameHindi: "रोबोट वैक्यूम क्लीनर", category: "Electronics & Appliances", defaultValue: 18000, description: "Robot vacuum cleaner" },
  { name: "Iron Box", nameHindi: "आयरन बॉक्स / प्रेस", category: "Electronics & Appliances", defaultValue: 1500, description: "Steam/dry iron" },
  { name: "Steam Iron", nameHindi: "स्टीम आयरन", category: "Electronics & Appliances", defaultValue: 3000, description: "Steam iron / garment steamer" },
  { name: "Inverter / UPS", nameHindi: "इनवर्टर / यूपीएस", category: "Electronics & Appliances", defaultValue: 8000, description: "Home inverter/UPS" },
  { name: "Inverter Battery", nameHindi: "इनवर्टर बैटरी", category: "Electronics & Appliances", defaultValue: 12000, description: "Inverter battery 150Ah" },
  { name: "Stabilizer", nameHindi: "स्टेबलाइजर", category: "Electronics & Appliances", defaultValue: 3000, description: "Voltage stabilizer" },
  { name: "Air Purifier", nameHindi: "एयर प्यूरीफायर", category: "Electronics & Appliances", defaultValue: 10000, description: "HEPA air purifier" },
  { name: "Dehumidifier", nameHindi: "डीह्यूमिडिफायर", category: "Electronics & Appliances", defaultValue: 12000, description: "Room dehumidifier" },
  { name: "Room Heater", nameHindi: "रूम हीटर", category: "Electronics & Appliances", defaultValue: 3000, description: "Electric room heater" },
  { name: "Oil-Filled Radiator", nameHindi: "ऑयल फिल्ड रेडिएटर", category: "Electronics & Appliances", defaultValue: 8000, description: "Oil-filled radiator heater" },
  { name: "Geyser / Water Heater", nameHindi: "गीजर / वॉटर हीटर", category: "Electronics & Appliances", defaultValue: 6000, description: "Electric water heater 15-25L" },
  { name: "Instant Water Heater", nameHindi: "इंस्टेंट वॉटर हीटर", category: "Electronics & Appliances", defaultValue: 3000, description: "Instant geyser 3L" },
  { name: "Solar Water Heater", nameHindi: "सोलर वॉटर हीटर", category: "Electronics & Appliances", defaultValue: 25000, description: "Solar water heater system" },
  { name: "Dishwasher", nameHindi: "डिशवॉशर", category: "Electronics & Appliances", defaultValue: 25000, description: "Automatic dishwasher" },
  { name: "Clothes Dryer", nameHindi: "कपड़ा ड्रायर", category: "Electronics & Appliances", defaultValue: 20000, description: "Clothes dryer machine" },
  { name: "Set Top Box", nameHindi: "सेट टॉप बॉक्स", category: "Electronics & Appliances", defaultValue: 2000, description: "DTH / cable set top box" },
  { name: "Home Theatre System", nameHindi: "होम थिएटर सिस्टम", category: "Electronics & Appliances", defaultValue: 15000, description: "5.1 surround sound system" },
  { name: "Soundbar", nameHindi: "साउंडबार", category: "Electronics & Appliances", defaultValue: 8000, description: "TV soundbar" },
  { name: "Bluetooth Speaker", nameHindi: "ब्लूटूथ स्पीकर", category: "Electronics & Appliances", defaultValue: 3000, description: "Portable Bluetooth speaker" },
  { name: "Smart Speaker (Alexa/Google)", nameHindi: "स्मार्ट स्पीकर", category: "Electronics & Appliances", defaultValue: 4000, description: "Smart home assistant speaker" },
  { name: "CCTV Camera System", nameHindi: "सीसीटीवी कैमरा", category: "Electronics & Appliances", defaultValue: 15000, description: "Home CCTV surveillance system" },
  { name: "Video Doorbell", nameHindi: "वीडियो डोरबेल", category: "Electronics & Appliances", defaultValue: 5000, description: "Smart video doorbell" },
  { name: "Smart Door Lock", nameHindi: "स्मार्ट डोर लॉक", category: "Electronics & Appliances", defaultValue: 8000, description: "Digital smart lock" },
  { name: "WiFi Router", nameHindi: "वाईफाई राउटर", category: "Electronics & Appliances", defaultValue: 2000, description: "WiFi router" },
  { name: "Mesh WiFi System", nameHindi: "मेश वाईफाई", category: "Electronics & Appliances", defaultValue: 8000, description: "Mesh WiFi system (3-pack)" },
  { name: "Sewing Machine", nameHindi: "सिलाई मशीन", category: "Electronics & Appliances", defaultValue: 8000, description: "Electric sewing machine" },
  { name: "Electric Kettle", nameHindi: "इलेक्ट्रिक केतली", category: "Electronics & Appliances", defaultValue: 1200, description: "Electric kettle 1.5L" },
  { name: "Induction Cooktop", nameHindi: "इंडक्शन कुकटॉप", category: "Electronics & Appliances", defaultValue: 2500, description: "Induction cooktop" },
  { name: "Chimney / Kitchen Hood", nameHindi: "चिमनी / किचन हुड", category: "Electronics & Appliances", defaultValue: 12000, description: "Auto-clean kitchen chimney" },
  { name: "Food Processor", nameHindi: "फूड प्रोसेसर", category: "Electronics & Appliances", defaultValue: 5000, description: "Multi-function food processor" },
  { name: "Juicer Mixer Grinder", nameHindi: "जूसर मिक्सर ग्राइंडर", category: "Electronics & Appliances", defaultValue: 4000, description: "Juicer mixer grinder 750W" },
  { name: "Mixer Grinder", nameHindi: "मिक्सर ग्राइंडर", category: "Electronics & Appliances", defaultValue: 3000, description: "Mixer grinder 3-jar" },
  { name: "Wet Grinder", nameHindi: "वेट ग्राइंडर", category: "Electronics & Appliances", defaultValue: 5000, description: "Table top wet grinder" },
  { name: "Hand Blender", nameHindi: "हैंड ब्लेंडर", category: "Electronics & Appliances", defaultValue: 1500, description: "Hand blender / immersion blender" },
  { name: "Coffee Machine", nameHindi: "कॉफी मशीन", category: "Electronics & Appliances", defaultValue: 8000, description: "Drip/espresso coffee maker" },
  { name: "Toaster", nameHindi: "टोस्टर", category: "Electronics & Appliances", defaultValue: 1500, description: "Bread toaster / sandwich maker" },
  { name: "Air Fryer", nameHindi: "एयर फ्रायर", category: "Electronics & Appliances", defaultValue: 6000, description: "Digital air fryer" },
  { name: "Electric Rice Cooker", nameHindi: "इलेक्ट्रिक राइस कुकर", category: "Electronics & Appliances", defaultValue: 3000, description: "Electric rice cooker" },
  { name: "Roti Maker", nameHindi: "रोटी मेकर", category: "Electronics & Appliances", defaultValue: 2000, description: "Electric roti/chapati maker" },
  { name: "Dosa Maker", nameHindi: "डोसा मेकर", category: "Electronics & Appliances", defaultValue: 2500, description: "Electric dosa maker" },
  { name: "Electric Chopper", nameHindi: "इलेक्ट्रिक चॉपर", category: "Electronics & Appliances", defaultValue: 1000, description: "Vegetable electric chopper" },
  { name: "Water Dispenser", nameHindi: "वॉटर डिस्पेंसर", category: "Electronics & Appliances", defaultValue: 8000, description: "Hot & cold water dispenser" },
  { name: "Deep Freezer", nameHindi: "डीप फ्रीजर", category: "Electronics & Appliances", defaultValue: 18000, description: "Chest deep freezer 200L+" },

  // ═══ Furniture (60+ items) ═══
  { name: "Wooden Almirah", nameHindi: "लकड़ी की अलमारी", category: "Furniture", defaultValue: 15000, description: "Wooden wardrobe/almirah" },
  { name: "Steel Almirah", nameHindi: "स्टील अलमारी", category: "Furniture", defaultValue: 8000, description: "Steel wardrobe/almirah" },
  { name: "Double Bed with Storage", nameHindi: "डबल बेड स्टोरेज", category: "Furniture", defaultValue: 25000, description: "King/queen size bed with storage" },
  { name: "Single Bed", nameHindi: "सिंगल बेड", category: "Furniture", defaultValue: 10000, description: "Single bed frame" },
  { name: "Bunk Bed", nameHindi: "बंक बेड", category: "Furniture", defaultValue: 18000, description: "Bunk bed / double decker" },
  { name: "Mattress (Spring)", nameHindi: "गद्दा (स्प्रिंग)", category: "Furniture", defaultValue: 15000, description: "Spring/foam mattress king size" },
  { name: "Mattress (Cotton/Coir)", nameHindi: "गद्दा (रुई/कॉयर)", category: "Furniture", defaultValue: 5000, description: "Cotton or coir mattress" },
  { name: "Sofa Set 3+1+1", nameHindi: "सोफा सेट", category: "Furniture", defaultValue: 35000, description: "5-seater sofa set" },
  { name: "L-Shape Sofa", nameHindi: "एल शेप सोफा", category: "Furniture", defaultValue: 45000, description: "L-shape corner sofa" },
  { name: "Recliner Chair", nameHindi: "रिक्लाइनर कुर्सी", category: "Furniture", defaultValue: 20000, description: "Recliner sofa chair" },
  { name: "Dining Table (4 Seater)", nameHindi: "डाइनिंग टेबल 4 सीटर", category: "Furniture", defaultValue: 15000, description: "4-seater dining table set" },
  { name: "Dining Table (6 Seater)", nameHindi: "डाइनिंग टेबल 6 सीटर", category: "Furniture", defaultValue: 25000, description: "6-seater dining table set" },
  { name: "Study Table", nameHindi: "स्टडी टेबल", category: "Furniture", defaultValue: 6000, description: "Study/work desk" },
  { name: "Computer Table", nameHindi: "कंप्यूटर टेबल", category: "Furniture", defaultValue: 5000, description: "Computer desk with keyboard tray" },
  { name: "Office Chair", nameHindi: "ऑफिस चेयर", category: "Furniture", defaultValue: 8000, description: "Ergonomic office chair" },
  { name: "Dressing Table", nameHindi: "ड्रेसिंग टेबल", category: "Furniture", defaultValue: 10000, description: "Dressing table with mirror" },
  { name: "TV Unit / Entertainment Center", nameHindi: "टीवी यूनिट", category: "Furniture", defaultValue: 12000, description: "TV stand/entertainment center" },
  { name: "Bookshelf", nameHindi: "बुकशेल्फ", category: "Furniture", defaultValue: 6000, description: "Wooden bookshelf" },
  { name: "Shoe Rack", nameHindi: "शू रैक", category: "Furniture", defaultValue: 3000, description: "Shoe rack/cabinet" },
  { name: "Center Table", nameHindi: "सेंटर टेबल", category: "Furniture", defaultValue: 5000, description: "Living room center/coffee table" },
  { name: "Side Table", nameHindi: "साइड टेबल", category: "Furniture", defaultValue: 2000, description: "Bedside/side table" },
  { name: "Console Table", nameHindi: "कंसोल टेबल", category: "Furniture", defaultValue: 8000, description: "Entrance console table" },
  { name: "Diwan", nameHindi: "दीवान", category: "Furniture", defaultValue: 12000, description: "Traditional diwan with storage" },
  { name: "Chest of Drawers", nameHindi: "ड्रॉअर चेस्ट", category: "Furniture", defaultValue: 8000, description: "Chest of drawers" },
  { name: "Kitchen Cabinet / Trolley", nameHindi: "किचन कैबिनेट / ट्रॉली", category: "Furniture", defaultValue: 15000, description: "Kitchen storage trolley/cabinet" },
  { name: "Modular Kitchen", nameHindi: "मॉड्यूलर किचन", category: "Furniture", defaultValue: 150000, description: "Complete modular kitchen setup" },
  { name: "Swing / Jhula", nameHindi: "झूला", category: "Furniture", defaultValue: 8000, description: "Indoor swing/jhula" },
  { name: "Bean Bag", nameHindi: "बीन बैग", category: "Furniture", defaultValue: 2000, description: "Bean bag chair" },
  { name: "Folding Table", nameHindi: "फोल्डिंग टेबल", category: "Furniture", defaultValue: 2000, description: "Foldable utility table" },
  { name: "Plastic Chair (set of 4)", nameHindi: "प्लास्टिक कुर्सी (4 का सेट)", category: "Furniture", defaultValue: 2000, description: "Set of 4 plastic chairs" },
  { name: "Wooden Chair", nameHindi: "लकड़ी की कुर्सी", category: "Furniture", defaultValue: 3000, description: "Solid wood chair" },
  { name: "Pooja Mandir / Temple", nameHindi: "पूजा मंदिर", category: "Furniture", defaultValue: 8000, description: "Wooden pooja mandir/temple" },
  { name: "Display Cabinet / Showcase", nameHindi: "शोकेस", category: "Furniture", defaultValue: 15000, description: "Glass display showcase" },
  { name: "Coat Stand / Hanger", nameHindi: "कोट स्टैंड", category: "Furniture", defaultValue: 1500, description: "Standing coat/clothes hanger" },
  { name: "Ironing Board", nameHindi: "आयरनिंग बोर्ड", category: "Furniture", defaultValue: 1500, description: "Foldable ironing board" },

  // ═══ Kitchen & Cookware (55+ items) ═══
  { name: "Gas Stove (2 Burner)", nameHindi: "गैस स्टोव 2 बर्नर", category: "Kitchen & Cookware", defaultValue: 3000, description: "2-burner gas stove" },
  { name: "Gas Stove (3 Burner)", nameHindi: "गैस स्टोव 3 बर्नर", category: "Kitchen & Cookware", defaultValue: 4000, description: "3-burner gas stove" },
  { name: "Gas Stove (4 Burner)", nameHindi: "गैस स्टोव 4 बर्नर", category: "Kitchen & Cookware", defaultValue: 6000, description: "4-burner gas stove with auto-ignition" },
  { name: "LPG Gas Cylinder", nameHindi: "एलपीजी गैस सिलेंडर", category: "Kitchen & Cookware", defaultValue: 1800, description: "14.2kg domestic LPG cylinder" },
  { name: "Pressure Cooker 3L", nameHindi: "प्रेशर कुकर 3 लीटर", category: "Kitchen & Cookware", defaultValue: 1500, description: "3-liter pressure cooker" },
  { name: "Pressure Cooker 5L", nameHindi: "प्रेशर कुकर 5 लीटर", category: "Kitchen & Cookware", defaultValue: 2000, description: "5-liter pressure cooker" },
  { name: "Non-Stick Cookware Set", nameHindi: "नॉन-स्टिक कुकवेयर सेट", category: "Kitchen & Cookware", defaultValue: 3000, description: "Non-stick cookware set (5-piece)" },
  { name: "Stainless Steel Utensils Set", nameHindi: "स्टेनलेस स्टील बर्तन सेट", category: "Kitchen & Cookware", defaultValue: 5000, description: "Complete steel utensils set" },
  { name: "Kadhai / Wok", nameHindi: "कड़ाही", category: "Kitchen & Cookware", defaultValue: 1000, description: "Iron/non-stick kadhai" },
  { name: "Tawa (Flat Pan)", nameHindi: "तवा", category: "Kitchen & Cookware", defaultValue: 600, description: "Roti/dosa tawa" },
  { name: "Dinner Set (Ceramic)", nameHindi: "डिनर सेट (सिरेमिक)", category: "Kitchen & Cookware", defaultValue: 3000, description: "27-piece ceramic dinner set" },
  { name: "Dinner Set (Steel)", nameHindi: "डिनर सेट (स्टील)", category: "Kitchen & Cookware", defaultValue: 4000, description: "Stainless steel dinner set" },
  { name: "Casserole Set", nameHindi: "कैसरोल सेट", category: "Kitchen & Cookware", defaultValue: 2000, description: "Insulated casserole set (3-piece)" },
  { name: "Water Bottle Set (Steel)", nameHindi: "पानी की बोतल सेट", category: "Kitchen & Cookware", defaultValue: 1000, description: "Steel water bottles" },
  { name: "Storage Container Set", nameHindi: "स्टोरेज कंटेनर सेट", category: "Kitchen & Cookware", defaultValue: 1500, description: "Airtight storage containers" },
  { name: "Masala Box / Dabba", nameHindi: "मसाला डब्बा", category: "Kitchen & Cookware", defaultValue: 500, description: "Stainless steel masala dabba" },
  { name: "Tiffin Box Set", nameHindi: "टिफिन बॉक्स सेट", category: "Kitchen & Cookware", defaultValue: 800, description: "Stackable tiffin/lunch boxes" },
  { name: "Flask / Thermos", nameHindi: "फ्लास्क / थर्मस", category: "Kitchen & Cookware", defaultValue: 1000, description: "Vacuum flask" },
  { name: "Glass Set (12 pcs)", nameHindi: "गिलास सेट", category: "Kitchen & Cookware", defaultValue: 600, description: "Steel/glass drinking set" },
  { name: "Idli Maker", nameHindi: "इडली मेकर", category: "Kitchen & Cookware", defaultValue: 800, description: "Idli steamer stand" },
  { name: "Dosa Pan", nameHindi: "डोसा तवा", category: "Kitchen & Cookware", defaultValue: 800, description: "Flat dosa pan" },
  { name: "Tandoor / Clay Oven", nameHindi: "तंदूर", category: "Kitchen & Cookware", defaultValue: 3000, description: "Electric/gas tandoor" },
  { name: "Knife Set", nameHindi: "चाकू सेट", category: "Kitchen & Cookware", defaultValue: 1500, description: "Kitchen knife set" },
  { name: "Cutting Board Set", nameHindi: "कटिंग बोर्ड", category: "Kitchen & Cookware", defaultValue: 500, description: "Chopping board set" },
  { name: "Spice Grinder (Manual)", nameHindi: "मसाला ग्राइंडर", category: "Kitchen & Cookware", defaultValue: 500, description: "Manual spice/masala grinder" },
  { name: "Rolling Pin & Board (Belan Chakla)", nameHindi: "बेलन चकला", category: "Kitchen & Cookware", defaultValue: 300, description: "Wooden belan chakla" },
  { name: "Kitchen Scale", nameHindi: "किचन वजन मशीन", category: "Kitchen & Cookware", defaultValue: 800, description: "Digital kitchen weighing scale" },
  { name: "Dustbin (Steel)", nameHindi: "डस्टबिन (स्टील)", category: "Kitchen & Cookware", defaultValue: 1000, description: "Pedal dustbin" },
  { name: "Water Filter Jug", nameHindi: "वॉटर फिल्टर जग", category: "Kitchen & Cookware", defaultValue: 500, description: "Water filter pitcher" },
  { name: "Serving Tray Set", nameHindi: "सर्विंग ट्रे सेट", category: "Kitchen & Cookware", defaultValue: 800, description: "Steel/wooden serving trays" },
  { name: "Cutlery Set", nameHindi: "कटलरी सेट", category: "Kitchen & Cookware", defaultValue: 1500, description: "24-piece cutlery set" },
  { name: "Handi Set (Brass/Copper)", nameHindi: "हांडी सेट", category: "Kitchen & Cookware", defaultValue: 3000, description: "Traditional cooking handi set" },
  { name: "Copper Water Jug & Glasses", nameHindi: "तांबे का जग व गिलास", category: "Kitchen & Cookware", defaultValue: 2000, description: "Copper jug and glass set" },

  // ═══ Valuables & Jewelry (25+ items) ═══
  { name: "Gold Necklace", nameHindi: "सोने का हार", category: "Valuables & Jewelry", defaultValue: 100000, description: "Gold necklace set" },
  { name: "Gold Chain", nameHindi: "सोने की चेन", category: "Valuables & Jewelry", defaultValue: 50000, description: "Gold chain" },
  { name: "Gold Bangles (pair)", nameHindi: "सोने की चूड़ियाँ", category: "Valuables & Jewelry", defaultValue: 80000, description: "Pair of gold bangles" },
  { name: "Gold Earrings", nameHindi: "सोने की बालियाँ", category: "Valuables & Jewelry", defaultValue: 25000, description: "Gold earrings/jhumka" },
  { name: "Gold Ring", nameHindi: "सोने की अंगूठी", category: "Valuables & Jewelry", defaultValue: 15000, description: "Gold ring" },
  { name: "Diamond Ring", nameHindi: "हीरे की अंगूठी", category: "Valuables & Jewelry", defaultValue: 50000, description: "Diamond studded ring" },
  { name: "Diamond Necklace", nameHindi: "हीरे का हार", category: "Valuables & Jewelry", defaultValue: 200000, description: "Diamond necklace set" },
  { name: "Silver Utensils Set", nameHindi: "चांदी के बर्तन", category: "Valuables & Jewelry", defaultValue: 30000, description: "Silver plates, glasses, bowls" },
  { name: "Silver Coins/Bars", nameHindi: "चांदी के सिक्के", category: "Valuables & Jewelry", defaultValue: 15000, description: "Silver investment coins/bars" },
  { name: "Gold Coins/Bars", nameHindi: "सोने के सिक्के", category: "Valuables & Jewelry", defaultValue: 100000, description: "Gold investment coins/bars" },
  { name: "Pearl Necklace", nameHindi: "मोती का हार", category: "Valuables & Jewelry", defaultValue: 15000, description: "Pearl necklace/mala" },
  { name: "Wrist Watch (Premium)", nameHindi: "कलाई घड़ी (प्रीमियम)", category: "Valuables & Jewelry", defaultValue: 25000, description: "Premium/luxury wrist watch" },
  { name: "Wrist Watch (Regular)", nameHindi: "कलाई घड़ी (रेगुलर)", category: "Valuables & Jewelry", defaultValue: 3000, description: "Regular wrist watch" },
  { name: "Mangalsutra", nameHindi: "मंगलसूत्र", category: "Valuables & Jewelry", defaultValue: 40000, description: "Gold mangalsutra" },
  { name: "Anklet (Payal)", nameHindi: "पायल", category: "Valuables & Jewelry", defaultValue: 5000, description: "Silver/gold anklet" },
  { name: "Nose Ring (Nath)", nameHindi: "नथ", category: "Valuables & Jewelry", defaultValue: 10000, description: "Traditional gold nath" },
  { name: "Waist Chain (Kamarband)", nameHindi: "कमरबंद", category: "Valuables & Jewelry", defaultValue: 15000, description: "Gold/silver kamarband" },
  { name: "Antique Collectibles", nameHindi: "एंटीक संग्रह", category: "Valuables & Jewelry", defaultValue: 20000, description: "Antique items and collectibles" },
  { name: "Painting / Art Work", nameHindi: "पेंटिंग / कलाकृति", category: "Valuables & Jewelry", defaultValue: 15000, description: "Art paintings and artwork" },

  // ═══ Clothing & Accessories (30+ items) ═══
  { name: "Designer Saree Collection", nameHindi: "डिज़ाइनर साड़ी कलेक्शन", category: "Clothing & Accessories", defaultValue: 30000, description: "Collection of designer/silk sarees" },
  { name: "Banarasi Saree", nameHindi: "बनारसी साड़ी", category: "Clothing & Accessories", defaultValue: 15000, description: "Pure Banarasi silk saree" },
  { name: "Lehenga (Bridal/Heavy)", nameHindi: "लहंगा (ब्राइडल)", category: "Clothing & Accessories", defaultValue: 25000, description: "Heavy/bridal lehenga" },
  { name: "Sherwani", nameHindi: "शेरवानी", category: "Clothing & Accessories", defaultValue: 12000, description: "Men's sherwani" },
  { name: "Men's Suit (Formal)", nameHindi: "मेंस सूट (फॉर्मल)", category: "Clothing & Accessories", defaultValue: 10000, description: "Formal suit with trousers" },
  { name: "Leather Jacket", nameHindi: "लेदर जैकेट", category: "Clothing & Accessories", defaultValue: 8000, description: "Genuine leather jacket" },
  { name: "Pashmina Shawl", nameHindi: "पश्मीना शॉल", category: "Clothing & Accessories", defaultValue: 10000, description: "Pure pashmina shawl" },
  { name: "Branded Handbag", nameHindi: "ब्रांडेड हैंडबैग", category: "Clothing & Accessories", defaultValue: 8000, description: "Designer/branded handbag" },
  { name: "Sunglasses (Branded)", nameHindi: "सनग्लासेस (ब्रांडेड)", category: "Clothing & Accessories", defaultValue: 5000, description: "Branded sunglasses" },
  { name: "Shoes (Branded/Formal)", nameHindi: "जूते (ब्रांडेड)", category: "Clothing & Accessories", defaultValue: 5000, description: "Branded/leather shoes" },
  { name: "Sports Shoes", nameHindi: "स्पोर्ट्स शूज", category: "Clothing & Accessories", defaultValue: 4000, description: "Running/sports shoes" },
  { name: "Luggage Set (3 pcs)", nameHindi: "लगेज सेट", category: "Clothing & Accessories", defaultValue: 8000, description: "Trolley luggage set" },
  { name: "Backpack (Branded)", nameHindi: "बैकपैक (ब्रांडेड)", category: "Clothing & Accessories", defaultValue: 3000, description: "Branded travel/laptop backpack" },
  { name: "Kurta Pajama Collection", nameHindi: "कुर्ता पजामा कलेक्शन", category: "Clothing & Accessories", defaultValue: 5000, description: "Men's kurta pajama set" },
  { name: "Silk Dupatta Collection", nameHindi: "सिल्क दुपट्टा", category: "Clothing & Accessories", defaultValue: 5000, description: "Collection of silk dupattas" },
  { name: "Perfume Collection", nameHindi: "परफ्यूम कलेक्शन", category: "Clothing & Accessories", defaultValue: 5000, description: "Branded perfumes" },

  // ═══ Computers & Gadgets (30+ items) ═══
  { name: "Laptop", nameHindi: "लैपटॉप", category: "Computers & Gadgets", defaultValue: 50000, description: "Laptop computer" },
  { name: "Gaming Laptop", nameHindi: "गेमिंग लैपटॉप", category: "Computers & Gadgets", defaultValue: 80000, description: "High-performance gaming laptop" },
  { name: "Desktop Computer", nameHindi: "डेस्कटॉप कंप्यूटर", category: "Computers & Gadgets", defaultValue: 40000, description: "Desktop PC with monitor" },
  { name: "Monitor (24 inch)", nameHindi: "मॉनिटर 24 इंच", category: "Computers & Gadgets", defaultValue: 12000, description: "24-inch computer monitor" },
  { name: "Printer (All-in-One)", nameHindi: "प्रिंटर (ऑल इन वन)", category: "Computers & Gadgets", defaultValue: 8000, description: "All-in-one printer/scanner" },
  { name: "Smartphone (Premium)", nameHindi: "स्मार्टफोन (प्रीमियम)", category: "Computers & Gadgets", defaultValue: 50000, description: "Premium smartphone" },
  { name: "Smartphone (Mid-range)", nameHindi: "स्मार्टफोन (मिड रेंज)", category: "Computers & Gadgets", defaultValue: 20000, description: "Mid-range smartphone" },
  { name: "Tablet / iPad", nameHindi: "टैबलेट / आईपैड", category: "Computers & Gadgets", defaultValue: 30000, description: "Tablet device" },
  { name: "Smartwatch", nameHindi: "स्मार्टवॉच", category: "Computers & Gadgets", defaultValue: 5000, description: "Smart fitness watch" },
  { name: "TWS Earbuds", nameHindi: "ट्रू वायरलेस ईयरबड्स", category: "Computers & Gadgets", defaultValue: 3000, description: "True wireless earbuds" },
  { name: "Headphones (Over-ear)", nameHindi: "हेडफोन्स", category: "Computers & Gadgets", defaultValue: 5000, description: "Over-ear headphones" },
  { name: "DSLR Camera", nameHindi: "डीएसएलआर कैमरा", category: "Computers & Gadgets", defaultValue: 45000, description: "DSLR camera with lens" },
  { name: "Action Camera (GoPro)", nameHindi: "एक्शन कैमरा", category: "Computers & Gadgets", defaultValue: 20000, description: "Action/sports camera" },
  { name: "Drone", nameHindi: "ड्रोन", category: "Computers & Gadgets", defaultValue: 25000, description: "Camera drone" },
  { name: "Gaming Console (PS5/Xbox)", nameHindi: "गेमिंग कंसोल", category: "Computers & Gadgets", defaultValue: 45000, description: "PlayStation/Xbox console" },
  { name: "Power Bank (20000mAh)", nameHindi: "पावर बैंक", category: "Computers & Gadgets", defaultValue: 1500, description: "Portable power bank" },
  { name: "External Hard Drive", nameHindi: "एक्सटर्नल हार्ड ड्राइव", category: "Computers & Gadgets", defaultValue: 4000, description: "1TB external hard drive" },
  { name: "Pen Drive / USB Drive", nameHindi: "पेन ड्राइव", category: "Computers & Gadgets", defaultValue: 500, description: "64GB+ USB drive" },
  { name: "Projector", nameHindi: "प्रोजेक्टर", category: "Computers & Gadgets", defaultValue: 15000, description: "Home projector" },
  { name: "E-Reader / Kindle", nameHindi: "ई-रीडर / किंडल", category: "Computers & Gadgets", defaultValue: 10000, description: "E-book reader" },
  { name: "Mechanical Keyboard", nameHindi: "मैकेनिकल कीबोर्ड", category: "Computers & Gadgets", defaultValue: 5000, description: "Gaming/mechanical keyboard" },
  { name: "Wireless Mouse", nameHindi: "वायरलेस माउस", category: "Computers & Gadgets", defaultValue: 1500, description: "Wireless mouse" },
  { name: "Webcam", nameHindi: "वेबकैम", category: "Computers & Gadgets", defaultValue: 3000, description: "HD webcam for video calls" },
  { name: "Drawing Tablet", nameHindi: "ड्रॉइंग टैबलेट", category: "Computers & Gadgets", defaultValue: 8000, description: "Digital drawing tablet" },

  // ═══ Home Decor (25+ items) ═══
  { name: "Curtains Set (Living Room)", nameHindi: "पर्दे (लिविंग रूम)", category: "Home Decor", defaultValue: 5000, description: "Living room curtain set" },
  { name: "Curtains Set (Bedroom)", nameHindi: "पर्दे (बेडरूम)", category: "Home Decor", defaultValue: 3000, description: "Bedroom curtain set" },
  { name: "Carpet / Area Rug", nameHindi: "कालीन", category: "Home Decor", defaultValue: 8000, description: "Persian/handmade carpet" },
  { name: "Kashmiri Carpet", nameHindi: "कश्मीरी कालीन", category: "Home Decor", defaultValue: 25000, description: "Handmade Kashmiri carpet" },
  { name: "Wall Clock", nameHindi: "दीवार घड़ी", category: "Home Decor", defaultValue: 2000, description: "Decorative wall clock" },
  { name: "Wall Mirror", nameHindi: "दीवार आइना", category: "Home Decor", defaultValue: 3000, description: "Full-length/decorative mirror" },
  { name: "Chandelier", nameHindi: "झाड़ बत्ती / शैंडेलियर", category: "Home Decor", defaultValue: 8000, description: "Crystal chandelier" },
  { name: "Table Lamp", nameHindi: "टेबल लैंप", category: "Home Decor", defaultValue: 2000, description: "Decorative table lamp" },
  { name: "Floor Lamp", nameHindi: "फ्लोर लैंप", category: "Home Decor", defaultValue: 4000, description: "Standing floor lamp" },
  { name: "Photo Frames Set", nameHindi: "फोटो फ्रेम सेट", category: "Home Decor", defaultValue: 1500, description: "Set of photo frames" },
  { name: "Decorative Vase", nameHindi: "सजावटी फूलदान", category: "Home Decor", defaultValue: 2000, description: "Ceramic/metal vase" },
  { name: "Artificial Plants Set", nameHindi: "आर्टिफिशियल प्लांट्स", category: "Home Decor", defaultValue: 2000, description: "Artificial plants and pots" },
  { name: "Bed Sheet Set (Premium)", nameHindi: "बेड शीट सेट (प्रीमियम)", category: "Home Decor", defaultValue: 3000, description: "Premium cotton bed sheets" },
  { name: "Comforter / Razai", nameHindi: "कम्फर्टर / रजाई", category: "Home Decor", defaultValue: 4000, description: "Quilted comforter/razai" },
  { name: "Towel Set (Premium)", nameHindi: "तौलिया सेट", category: "Home Decor", defaultValue: 2000, description: "Premium bath towel set" },
  { name: "Cushion Covers Set", nameHindi: "कुशन कवर सेट", category: "Home Decor", defaultValue: 1000, description: "Set of cushion covers" },
  { name: "Door Mat Set", nameHindi: "डोर मैट सेट", category: "Home Decor", defaultValue: 500, description: "Set of door mats" },
  { name: "Showpiece / Figurine", nameHindi: "शोपीस", category: "Home Decor", defaultValue: 2000, description: "Decorative showpiece" },
  { name: "Aquarium", nameHindi: "एक्वेरियम", category: "Home Decor", defaultValue: 5000, description: "Fish aquarium with accessories" },

  // ═══ Fitness & Sports (20+ items) ═══
  { name: "Treadmill", nameHindi: "ट्रेडमिल", category: "Fitness & Sports", defaultValue: 25000, description: "Motorized treadmill" },
  { name: "Exercise Cycle", nameHindi: "एक्सरसाइज साइकल", category: "Fitness & Sports", defaultValue: 10000, description: "Stationary exercise bike" },
  { name: "Cross Trainer / Elliptical", nameHindi: "क्रॉस ट्रेनर", category: "Fitness & Sports", defaultValue: 20000, description: "Elliptical cross trainer" },
  { name: "Dumbbells Set", nameHindi: "डंबल सेट", category: "Fitness & Sports", defaultValue: 5000, description: "Adjustable dumbbells set" },
  { name: "Yoga Mat", nameHindi: "योगा मैट", category: "Fitness & Sports", defaultValue: 800, description: "Yoga/exercise mat" },
  { name: "Cricket Kit", nameHindi: "क्रिकेट किट", category: "Fitness & Sports", defaultValue: 5000, description: "Cricket bat, pads, gloves" },
  { name: "Badminton Set", nameHindi: "बैडमिंटन सेट", category: "Fitness & Sports", defaultValue: 2000, description: "Rackets, shuttlecocks, net" },
  { name: "Table Tennis Table", nameHindi: "टेबल टेनिस टेबल", category: "Fitness & Sports", defaultValue: 10000, description: "Indoor TT table" },
  { name: "Carrom Board", nameHindi: "कैरम बोर्ड", category: "Fitness & Sports", defaultValue: 2000, description: "Tournament size carrom board" },
  { name: "Chess Set", nameHindi: "शतरंज सेट", category: "Fitness & Sports", defaultValue: 1000, description: "Wooden chess set" },
  { name: "Bicycle", nameHindi: "साइकल", category: "Fitness & Sports", defaultValue: 8000, description: "Adult bicycle" },
  { name: "Kids Bicycle", nameHindi: "बच्चों की साइकल", category: "Fitness & Sports", defaultValue: 4000, description: "Children's bicycle" },
  { name: "Gym Bench", nameHindi: "जिम बेंच", category: "Fitness & Sports", defaultValue: 5000, description: "Multi-purpose gym bench" },
  { name: "Pull-up Bar", nameHindi: "पुल-अप बार", category: "Fitness & Sports", defaultValue: 1500, description: "Door-mounted pull-up bar" },
  { name: "Resistance Bands Set", nameHindi: "रजिस्टेंस बैंड्स", category: "Fitness & Sports", defaultValue: 1000, description: "Resistance bands set" },
  { name: "Football", nameHindi: "फुटबॉल", category: "Fitness & Sports", defaultValue: 1000, description: "Football/soccer ball" },
  { name: "Swimming Gear", nameHindi: "स्विमिंग गियर", category: "Fitness & Sports", defaultValue: 3000, description: "Goggles, cap, swimsuit" },
  { name: "Skipping Rope", nameHindi: "स्किपिंग रोप", category: "Fitness & Sports", defaultValue: 500, description: "Skipping/jump rope" },

  // ═══ Musical Instruments (10+ items) ═══
  { name: "Harmonium", nameHindi: "हारमोनियम", category: "Musical Instruments", defaultValue: 8000, description: "Portable harmonium" },
  { name: "Tabla Set", nameHindi: "तबला सेट", category: "Musical Instruments", defaultValue: 6000, description: "Tabla pair with cover" },
  { name: "Sitar", nameHindi: "सितार", category: "Musical Instruments", defaultValue: 15000, description: "Traditional sitar" },
  { name: "Acoustic Guitar", nameHindi: "अकूस्टिक गिटार", category: "Musical Instruments", defaultValue: 5000, description: "Acoustic guitar" },
  { name: "Electric Guitar", nameHindi: "इलेक्ट्रिक गिटार", category: "Musical Instruments", defaultValue: 12000, description: "Electric guitar with amp" },
  { name: "Casio Keyboard", nameHindi: "कैसियो कीबोर्ड", category: "Musical Instruments", defaultValue: 8000, description: "Electronic keyboard 61 keys" },
  { name: "Digital Piano", nameHindi: "डिजिटल पियानो", category: "Musical Instruments", defaultValue: 25000, description: "88-key digital piano" },
  { name: "Dholak", nameHindi: "ढोलक", category: "Musical Instruments", defaultValue: 3000, description: "Dholak drum" },
  { name: "Flute (Bansuri)", nameHindi: "बांसुरी", category: "Musical Instruments", defaultValue: 1000, description: "Bamboo bansuri/flute" },
  { name: "Veena", nameHindi: "वीणा", category: "Musical Instruments", defaultValue: 20000, description: "Traditional veena" },
  { name: "Violin", nameHindi: "वायलिन", category: "Musical Instruments", defaultValue: 8000, description: "Violin with case" },

  // ═══ Baby & Kids (15+ items) ═══
  { name: "Baby Crib / Cot", nameHindi: "बच्चे का पालना", category: "Baby & Kids", defaultValue: 8000, description: "Baby crib/cot with mattress" },
  { name: "Baby Stroller", nameHindi: "बेबी स्ट्रोलर", category: "Baby & Kids", defaultValue: 6000, description: "Baby pram/stroller" },
  { name: "Car Seat (Baby)", nameHindi: "कार सीट (बेबी)", category: "Baby & Kids", defaultValue: 5000, description: "Baby/toddler car seat" },
  { name: "High Chair", nameHindi: "हाई चेयर", category: "Baby & Kids", defaultValue: 4000, description: "Baby feeding high chair" },
  { name: "Baby Walker", nameHindi: "बेबी वॉकर", category: "Baby & Kids", defaultValue: 2000, description: "Baby walker" },
  { name: "Kids Study Table & Chair", nameHindi: "बच्चों का स्टडी टेबल", category: "Baby & Kids", defaultValue: 4000, description: "Children's study desk and chair" },
  { name: "Toy Collection", nameHindi: "खिलौने कलेक्शन", category: "Baby & Kids", defaultValue: 5000, description: "Collection of toys" },
  { name: "LEGO Sets", nameHindi: "लेगो सेट्स", category: "Baby & Kids", defaultValue: 5000, description: "LEGO building sets" },
  { name: "Board Games Collection", nameHindi: "बोर्ड गेम्स", category: "Baby & Kids", defaultValue: 3000, description: "Board games and puzzles" },
  { name: "Kids Cycle Accessories", nameHindi: "बच्चों की साइकल", category: "Baby & Kids", defaultValue: 4000, description: "Tricycle and accessories" },
  { name: "Electric Toy Car", nameHindi: "इलेक्ट्रिक टॉय कार", category: "Baby & Kids", defaultValue: 8000, description: "Kids ride-on electric car" },
  { name: "Baby Monitor", nameHindi: "बेबी मॉनिटर", category: "Baby & Kids", defaultValue: 4000, description: "Video baby monitor" },
  { name: "Kids Bookshelf", nameHindi: "बच्चों की बुकशेल्फ", category: "Baby & Kids", defaultValue: 3000, description: "Small bookshelf for kids" },

  // ═══ Garden & Outdoor (12+ items) ═══
  { name: "Garden Furniture Set", nameHindi: "गार्डन फर्नीचर सेट", category: "Garden & Outdoor", defaultValue: 15000, description: "Outdoor table & chairs set" },
  { name: "Lawn Mower", nameHindi: "लॉन मोवर", category: "Garden & Outdoor", defaultValue: 8000, description: "Electric lawn mower" },
  { name: "Garden Tools Set", nameHindi: "गार्डन टूल्स सेट", category: "Garden & Outdoor", defaultValue: 2000, description: "Gardening tools kit" },
  { name: "Water Hose & Sprinkler", nameHindi: "पानी का पाइप", category: "Garden & Outdoor", defaultValue: 1500, description: "Garden hose with sprinkler" },
  { name: "Plant Pots Collection", nameHindi: "गमलों का कलेक्शन", category: "Garden & Outdoor", defaultValue: 3000, description: "Ceramic/terracotta plant pots" },
  { name: "Outdoor Umbrella", nameHindi: "आउटडोर छतरी", category: "Garden & Outdoor", defaultValue: 3000, description: "Patio umbrella" },
  { name: "BBQ Grill", nameHindi: "बीबीक्यू ग्रिल", category: "Garden & Outdoor", defaultValue: 5000, description: "Charcoal/gas BBQ grill" },
  { name: "Pressure Washer", nameHindi: "प्रेशर वॉशर", category: "Garden & Outdoor", defaultValue: 6000, description: "High-pressure washer" },
  { name: "Ladder (Aluminium)", nameHindi: "सीढ़ी (एल्युमिनियम)", category: "Garden & Outdoor", defaultValue: 3000, description: "Foldable aluminium ladder" },
  { name: "Tool Kit / Tool Box", nameHindi: "टूल किट", category: "Garden & Outdoor", defaultValue: 3000, description: "Home repair tool kit" },
  { name: "Outdoor Lights / String Lights", nameHindi: "आउटडोर लाइट्स", category: "Garden & Outdoor", defaultValue: 2000, description: "Decorative string lights" },
  { name: "Solar Panel (Small)", nameHindi: "सोलर पैनल (छोटा)", category: "Garden & Outdoor", defaultValue: 15000, description: "Small solar panel system" },

  // ═══ Documents & Important Papers (10+ items) ═══
  { name: "Property Papers", nameHindi: "प्रॉपर्टी के कागज़", category: "Documents & Important Papers", defaultValue: 0, description: "Property ownership documents" },
  { name: "Fixed Deposit Certificates", nameHindi: "फिक्स्ड डिपॉजिट सर्टिफिकेट", category: "Documents & Important Papers", defaultValue: 0, description: "Bank FD certificates" },
  { name: "Education Certificates", nameHindi: "शिक्षा प्रमाणपत्र", category: "Documents & Important Papers", defaultValue: 0, description: "Degree and mark sheets" },
  { name: "Passport", nameHindi: "पासपोर्ट", category: "Documents & Important Papers", defaultValue: 0, description: "Indian passport" },
  { name: "Vehicle Registration (RC)", nameHindi: "गाड़ी का आरसी", category: "Documents & Important Papers", defaultValue: 0, description: "Vehicle registration certificate" },
  { name: "Safe / Locker", nameHindi: "तिजोरी / लॉकर", category: "Documents & Important Papers", defaultValue: 8000, description: "Home safe/fire-proof locker" },
  { name: "Insurance Policy Documents", nameHindi: "बीमा पॉलिसी दस्तावेज", category: "Documents & Important Papers", defaultValue: 0, description: "Physical insurance documents" },

  // ═══ Bathroom & Sanitary (10+ items) ═══
  { name: "Bathroom Fittings (Premium)", nameHindi: "बाथरूम फिटिंग्स", category: "Bathroom & Sanitary", defaultValue: 15000, description: "Premium taps, shower, fittings" },
  { name: "Bathtub", nameHindi: "बाथटब", category: "Bathroom & Sanitary", defaultValue: 20000, description: "Acrylic bathtub" },
  { name: "Jacuzzi", nameHindi: "जकूज़ी", category: "Bathroom & Sanitary", defaultValue: 50000, description: "Jacuzzi/whirlpool bath" },
  { name: "Washing Basin (Designer)", nameHindi: "वॉश बेसिन (डिज़ाइनर)", category: "Bathroom & Sanitary", defaultValue: 5000, description: "Designer wash basin" },
  { name: "Medicine Cabinet", nameHindi: "मेडिसिन कैबिनेट", category: "Bathroom & Sanitary", defaultValue: 2000, description: "Bathroom medicine cabinet" },
  { name: "Weighing Machine", nameHindi: "वज़न मशीन", category: "Bathroom & Sanitary", defaultValue: 1500, description: "Digital body weighing scale" },
  { name: "Hair Dryer", nameHindi: "हेयर ड्रायर", category: "Bathroom & Sanitary", defaultValue: 1500, description: "Hair dryer" },
  { name: "Hair Straightener", nameHindi: "हेयर स्ट्रेटनर", category: "Bathroom & Sanitary", defaultValue: 2000, description: "Hair straightener/curler" },
  { name: "Trimmer / Grooming Kit", nameHindi: "ट्रिमर / ग्रूमिंग किट", category: "Bathroom & Sanitary", defaultValue: 2000, description: "Electric trimmer and grooming kit" },
  { name: "Water Motor / Pump", nameHindi: "वॉटर मोटर / पंप", category: "Bathroom & Sanitary", defaultValue: 5000, description: "Water pump/motor" },

  // ═══ Vehicles & Accessories (10+ items) ═══
  { name: "Car Accessories Set", nameHindi: "कार एक्सेसरीज़", category: "Vehicles & Accessories", defaultValue: 5000, description: "Seat covers, mats, accessories" },
  { name: "Car Dash Camera", nameHindi: "कार डैश कैमरा", category: "Vehicles & Accessories", defaultValue: 5000, description: "Dash cam for car" },
  { name: "Car Music System", nameHindi: "कार म्यूज़िक सिस्टम", category: "Vehicles & Accessories", defaultValue: 8000, description: "After-market car stereo" },
  { name: "Bike Helmet (Premium)", nameHindi: "बाइक हेलमेट (प्रीमियम)", category: "Vehicles & Accessories", defaultValue: 3000, description: "Premium motorcycle helmet" },
  { name: "Riding Jacket", nameHindi: "राइडिंग जैकेट", category: "Vehicles & Accessories", defaultValue: 5000, description: "Motorcycle riding jacket" },
  { name: "Roof Box / Carrier", nameHindi: "रूफ बॉक्स", category: "Vehicles & Accessories", defaultValue: 8000, description: "Car roof cargo carrier" },
  { name: "GPS Navigator", nameHindi: "जीपीएस नेविगेटर", category: "Vehicles & Accessories", defaultValue: 5000, description: "GPS navigation device" },
  { name: "Car Vacuum Cleaner", nameHindi: "कार वैक्यूम क्लीनर", category: "Vehicles & Accessories", defaultValue: 2000, description: "Portable car vacuum" },
  { name: "Tyre Inflator", nameHindi: "टायर इन्फ्लेटर", category: "Vehicles & Accessories", defaultValue: 2000, description: "Portable air compressor" },
  { name: "Car Refrigerator (Mini)", nameHindi: "कार फ्रिज (मिनी)", category: "Vehicles & Accessories", defaultValue: 5000, description: "Mini car refrigerator" },

  // ═══ Religious & Puja Items (15+ items) ═══
  { name: "Silver Puja Thali Set", nameHindi: "चांदी की पूजा थाली", category: "Religious & Puja Items", defaultValue: 10000, description: "Silver puja thali with accessories" },
  { name: "Brass Puja Set", nameHindi: "पीतल का पूजा सेट", category: "Religious & Puja Items", defaultValue: 3000, description: "Brass diya, bell, items" },
  { name: "Marble Ganesh Murti", nameHindi: "संगमरमर गणेश मूर्ति", category: "Religious & Puja Items", defaultValue: 5000, description: "Marble Ganesh idol" },
  { name: "Silver Ganesh Murti", nameHindi: "चांदी की गणेश मूर्ति", category: "Religious & Puja Items", defaultValue: 15000, description: "Silver Ganesh idol" },
  { name: "Gold-Plated Idols", nameHindi: "सोने की मूर्तियाँ", category: "Religious & Puja Items", defaultValue: 8000, description: "Gold-plated deity idols" },
  { name: "Brass Diya Set", nameHindi: "पीतल का दीया सेट", category: "Religious & Puja Items", defaultValue: 2000, description: "Set of brass diyas" },
  { name: "Silver Kalash", nameHindi: "चांदी का कलश", category: "Religious & Puja Items", defaultValue: 5000, description: "Silver puja kalash" },
  { name: "Crystal Shivling", nameHindi: "स्फटिक शिवलिंग", category: "Religious & Puja Items", defaultValue: 3000, description: "Crystal/sphatik shivling" },
  { name: "Tulsi Manch", nameHindi: "तुलसी मंच", category: "Religious & Puja Items", defaultValue: 2000, description: "Tulsi plant stand" },
  { name: "Religious Books Collection", nameHindi: "धार्मिक पुस्तकें", category: "Religious & Puja Items", defaultValue: 2000, description: "Bhagwad Gita, Ramayan, etc." },
  { name: "Incense Stick Holder Set", nameHindi: "अगरबत्ती स्टैंड सेट", category: "Religious & Puja Items", defaultValue: 500, description: "Agarbatti holder set" },
  { name: "Camphor Lamp (Kapur Dani)", nameHindi: "कपूर दानी", category: "Religious & Puja Items", defaultValue: 500, description: "Camphor burner" },
  { name: "Puja Bell (Ghanti)", nameHindi: "पूजा घंटी", category: "Religious & Puja Items", defaultValue: 500, description: "Brass puja bell" },
  { name: "Rudraksha Mala", nameHindi: "रुद्राक्ष माला", category: "Religious & Puja Items", defaultValue: 2000, description: "Rudraksha prayer beads" },
  { name: "Conch Shell (Shankh)", nameHindi: "शंख", category: "Religious & Puja Items", defaultValue: 1000, description: "Puja shankh/conch" },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  console.log("  🗑️  Clearing existing preset items and categories...");
  await prisma.presetItem.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  console.log("  📁 Creating categories...");
  const categoryMap = new Map<string, string>();
  for (const cat of categories) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        isPreseeded: true,
      },
    });
    categoryMap.set(cat.name, created.id);
  }
  console.log(`  ✅ Created ${categories.length} categories`);

  // Create preset items
  console.log("  📦 Creating preset items...");
  let count = 0;
  for (const item of presetItems) {
    const categoryId = categoryMap.get(item.category);
    if (!categoryId) {
      console.warn(`  ⚠️  Category not found for item: ${item.name}`);
      continue;
    }
    await prisma.presetItem.create({
      data: {
        name: item.name,
        nameHindi: item.nameHindi,
        categoryId,
        defaultValue: item.defaultValue,
        brand: item.brand,
        description: item.description,
      },
    });
    count++;
  }
  console.log(`  ✅ Created ${count} preset items`);

  console.log("\n🎉 Seed completed successfully!");
  console.log(`   Total categories: ${categories.length}`);
  console.log(`   Total preset items: ${count}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
