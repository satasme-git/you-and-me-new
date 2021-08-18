import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, ListView, Image } from 'react-native';
import { IMAGE } from '../constants/image';
export default {
  data: [
    {
      title: 'Carbohydrate ',

      body:
        'Grain, Potatos,Fruits,Suger,\nVegetables',
      src: IMAGE.ICON_CARBOHIDRATE,
      content: 'Carbohydrates are the primary source of energy for the body. Fruits, vegetables, grains, and dairy products contain carbohydrates.  Whole grains are an important source of nutrients, such as dietary fiber. They also provide a variety of health benefits. Other important carbohydrate foods include enriched refined grains. These grains have the added benefit of iron and folic acid, two essential nutrients for the baby’s development. Many carbohydrate foods are great choices for breakfast. Including English muffins, yogurt, bagels, cereals, breads, and fruits. Other carbohydrate-containing choices for meals or snacks include crackers, bread, and pasta.\n\nIf you are vegetarian, you can meet your protein needs by eating foods that are complete protein sources. A complete protein has all the essential “building blocks” (amino acids) your body needs. Each day, eat a variety of protein sources to provide your body with essential amino acids. Vegetarian protein options include beans, milk, yogurt, eggs, and soy products. Greek yogurt is another great option. It has twice the amount of protein when compared to regular yogurt. Pregnant vegans are able to meet their protein needs from soy, a complete protein source. Sources of soy protein include soy milk, soy cheese, soy yogurt, tofu, and tempeh. Examples of other protein-rich vegan foods are nuts and beans (red kidney beans, chickpeas, black beans, etc.)',

    },
    {
      title: 'Protein',

      body:
        'Chicken, Fish,Egg,Dairy Products,Green Peas,Dhal,\nBeans,Soya',
      src: IMAGE.ICON_PROTEIN,
      content: 'Protein helps maintain muscle and body tissue. It is also key for a baby’s growth – especially during the second and third trimesters. Most pregnant women should take in about 70 grams of protein every day to meet their minimum needs. Keep in mind you may need more than that.  Protein requirements vary based on weight and activity level. Talk to your health care provider if you have questions about your daily protein intake. Lean meats, poultry, fish, eggs, dairy products, and legumes (beans) are good sources of protein. These foods also supply iron, B vitamins, and other important nutrients. Dried beans, lentils, nuts, and soy products like tofu are other good sources of protein.',
    },
    {
      title: 'Fat',

      body:
        'Milk,Egg,Chicken,Butter,Cheese,Fishoil',
      src: IMAGE.ICON_FAT,
      content: 'Fat is key for good nutrition, health, and storage of many important vitamins. Like carbohydrates and protein, dietary fat is an important source of energy for the body. Certain foods that contain fat supply the body with essential fatty acids. Essential fatty acids are fats that the body does not make, so they should be included in the diet. Most importantly, essential fatty acids are critical for the baby’s growth and development' +

        'Health experts recommend keeping total fat intake between 20 and 35 percent of total calories. Most fats should come from unsaturated sources. Sources of unsaturated fat include fish, vegetable oils (canola, soybean, olive, peanut, safflower, and sunflower oils), nuts, and flaxseeds. All women, including those who are pregnant or breastfeeding should follow these recommendations.',
    },
    {
      title: 'Vitamin A',

      body:
        'Egg Yolk,Milk,Cheese,Butter,\nFish Oil',
      src: IMAGE.ICON_VITAMIN_A,
      content: 'Vitamin A supplementation is only recommended for pregnant women in areas where vitamin A deficiency is a severe public health problem*, to prevent night blindness.**' +

        '* Vitamin A deficiency is a severe public health problem if ≥5% of women in a population have a history of night blindness in their most recent pregnancy in the previous 3–5 years that ended in a live birth, or if ≥20% of pregnant women have a serum retinol level <0.70 µmol/L. Determination of vitamin A deficiency as a public health problem involves estimating the prevalence of deficiency in a population by using specific biochemical and clinical indicators of vitamin A status.' +
        '\n\n** This recommendation supercedes the previous recommendation found in the WHO guideline ‘Vitamin A supplementation in pregnant women (2011)',
    },
    {
      title: 'Vitamin B',
      body:
        'Milk,Egg,Chicken,Green Vegetables',
      src: IMAGE.ICON_VITAMIN_B,
      content: 'Maintaining a healthy & balanced diet at all stages of life is important, but when you’re pregnant you have even more reason to take care of your body to ensure your little one grows into a healthy, bouncing baby!  B vitamins, which you’ll often hear referred to as the vitamin B complex, are particularly important aspects of your nutrition during pregnancy, especially vitamins B6, B9, and B12. These three specifically help minimize the risk of birth defects as well as relieve some symptoms of pregnancy.' +
        'This is why taking quality prenatal vitamins is a great way to assure you are getting all the vitamins you and baby need for a healthy pregnancy. Of course, prenatal vitamins are not meant to replace a healthy diet, but to support one.',
    },
    {
      title: 'Vitamin C',
      body:
        'Citrus Fruits\n(Lime,Orange,Nellie)',
      src: IMAGE.ICON_VITAMIN_C,
      content: "Both you and your baby need vitamin C daily because it's necessary for the body to make collagen, a structural protein that's a component of cartilage, tendons, bones, and skin. Based on animal studies, some researchers believe that vitamin C deficiencies in newborn babies can impair mental development." +
        "Also known as ascorbic acid, vitamin C is essential for tissue repair, wound healing, bone growth and repair, and healthy skin. Vitamin C helps your body fight infections and acts as an antioxidant, protecting cells from damage. \n\nCitrus fruits are especially high in vitamin C, but leafy greens and many other fruits and vegetables are also excellent sources. Choose fresh foods as your source of vitamin C because heat can destroy this vitamin. Also, some cereals and juices are fortified with vitamin C",
    },
    {
      title: 'Vitamin D',
      body:
        'Animal Liver,Fish,Egg',
      src: IMAGE.ICON_VITAMIN_D,
      content: 'Vitamin D is known to play an important role in bone metabolism through regulation of calcium and phosphate equilibrium. Vitamin D is produced by the body during exposure to sunlight, but is also found in oily fish, eggs and fortified food products.' +
        'Vitamin D deficiency is thought to be common among pregnant women in some populations, and has been found to be associated with an increased risk of pre-eclampsia, gestational diabetes mellitus, preterm birth, and other tissue-specific conditions.' +
        'Vitamin D supplementation during pregnancy improves maternal vitamin D status and may reduce the risk of pre-eclampsia, low birthweight and preterm birth. However, the evidence currently available to directly assess the benefits and harms of the use of vitamin D supplementation alone in pregnancy for improving maternal and infant health outcomes is limited.' +
        'Pregnant women should be encouraged to receive adequate nutrition, which is best achieved through consumption of a healthy balanced diet.',
    },
    {
      title: 'Vitamin E',
      body:
        'Green Vegetables,Vegetable Oils',
      src: IMAGE.ICON_VITAMIN_E,
      content: "Vitamin E is a fat-soluble vitamin found in many foods, such as olive oil and brocolli1. With its antioxidant properties, one of vitamin E's main functions is protecting cell membranes from damage2 – a healthy intake of vitamin E contributes to the structure of cells throughout your body." +
        "Vitamin E also contributes to healthy skin and eyes, in addition to strengthening your immune system1." +
        "Scientific studies have shown that an adequate intake of vitamin E during pregnancy reduces the likelihood of your baby developing asthma and respiratory issues later in life3",
    }, {
      title: 'Mineral Salts',
      body:
        'Animal Liver,Egg,Egg Yolk,Beef',
      src: IMAGE.ICON_MINERAL,
      content: 'Pregnancy is a dynamic state that requires increased nutrient intakes in order to support the growing fetus, placenta and maternal tissues, and hence a successful pregnancy outcome. Although maternal micronutrient deficiencies during pregnancy are often associated with pregnancy complications, as well as adverse fetal growth and development, evidence to support routine vitamin and mineral supplementation is relatively scarce. This review summarises existing evidence and special considerations regarding folic acid, vitamin B12, vitamin D, calcium, zinc, iron, selenium and iodine supplementation on pregnancy outcomes. Current practice recommendations are for routine supplementation of folic acid and iodine, but recommendations regarding other vitamins and minerals are based on an individualised approach in pregnancy, with supplementation restricted to women with insufficient dietary intakes or established deficiencies. This review aims to support pharmacists in evaluating the appropriateness of various individual and multicomponent vitamin and mineral supplements and providing balanced and up‐to‐date information to women who are either planning pregnancy or are already pregnant.',
    },

  ],
};