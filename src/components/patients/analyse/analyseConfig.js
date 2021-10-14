export const analyseConfig = [ {
  category: 'Hématologie',
  subCategories: [{
    subCategoryName: 'NUMERATION GLOBULAIRE',
    results: [
      {
        code: 'HMTC',
        label: 'Hématies',
        unit: 'Tera/L',
        reference_min: '4.28',
        reference_max: '5.79',
        historique:''
      },
      {
        code: 'VGM',
        label: 'V.G.M.',
        unit: 'fl',
        reference_min: '78.0',
        reference_max: '97.0',
        historique:''
      }
    ]
  },
  {
    subCategoryName: 'FORMULE LEUCOCYTAIRE',
    results: [
      {
        code: 'Monocytes',
        label: 'Monocytes',
        unit: 'Tera/L',
        reference_min: '4.28',
        reference_max: '5.79',
        historique:''
      },
      {
        code: 'Lymphocytes',
        label: 'Lymphocytes',
        unit: 'fl',
        reference_min: '78.0',
        reference_max: '97.0',
        historique:''
      }
    ]
  }
],
},
{
  category: 'Hémostase',
  subCategories: [{
    subCategoryName: 'TAUX DE PROTHROMBINE',
    results: [
      {
        code: 'INR',
        label: 'INR',
        unit: '%',
        reference_min: '4.28',
        reference_max: '5.79',
        historique:''
      },
      {
        code: 'TP',
        label: 'T.P',
        unit: 'fl',
        reference_min: '78.0',
        reference_max: '97.0',
        historique:''
      }
    ]
  },
  {
    subCategoryName: 'TEMPS DE CEPHALINE ACTIVEE - APTT SP',
    results: [
      {
        code: 'Ratio M/T',
        label: 'RatioMT',
        unit: 'Tera/L',
        reference_min: '4.28',
        reference_max: '5.79',
        historique:''
      },
      {
        code: 'TCA',
        label: 'TCA',
        unit: 'fl',
        reference_min: '78.0',
        reference_max: '97.0',
        historique:''
      }
    ]
  }
],
}
]