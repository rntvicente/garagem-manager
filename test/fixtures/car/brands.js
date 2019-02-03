const brands = [
  {
    name: 'AUDI',
    nameFipe: 'Audi',
    key: 'audi-6'
  },
  {
    name: 'BMW',
    nameFipe: 'BMW',
    key: 'bmw-7'
  },
  {
    name: 'CITROEN',
    nameFipe: 'Citroën',
    key: 'citroen-13'
  },
  {
    name: 'FIAT',
    nameFipe: 'Fiat',
    key: 'fiat-21'
  },
  {
    name: 'FORD',
    nameFipe: 'Ford',
    key: 'ford-22'
  },
  {
    name: 'CHEVROLET',
    nameFipe: 'GM - Chevrolet',
    key: 'gm-chevrolet-23'
  },
  {
    name: 'HONDA',
    nameFipe: 'Honda',
    key: 'honda-25'
  },
  {
    name: 'HYUNDAI',
    nameFipe: 'Hyundai',
    key: 'hyundai-26'
  },
  {
    name: 'KIA',
    nameFipe: 'Kia Motors',
    key: 'kia-motors-31'
  },
  {
    name: 'MERCEDES-BENZ',
    nameFipe: 'Mercedes-Benz',
    key: 'mercedes-benz-39'
  },
  {
    name: 'MITSUBISHI',
    nameFipe: 'Mitsubishi',
    key: 'mitsubishi-41'
  },
  {
    name: 'NISSAN',
    nameFipe: 'Nissan',
    key: 'nissan-43'
  },
  {
    name: 'PEUGEOT',
    nameFipe: 'Peugeot',
    key: 'peugeot-44'
  },
  {
    name: 'RENAULT',
    nameFipe: 'Renault',
    key: 'renault-48'
  },
  {
    name: 'SUZUKI',
    nameFipe: 'Suzuki',
    key: 'suzuki-55'
  },
  {
    name: 'TOYOTA',
    nameFipe: 'Toyota',
    key: 'toyota-56'
  },
  {
    name: 'VOLVO',
    nameFipe: 'Volvo',
    key: 'volvo-58'
  },
  {
    name: 'VOLKSWAGEN',
    nameFipe: 'VW - VolksWagen',
    key: 'vw-volkswagen-59'
  },
  {
    name: 'ACURA',
    nameFipe: 'Acura',
    key: 'acura-1'
  },
  {
    name: 'AGRALE',
    nameFipe: 'Agrale',
    key: 'agrale-2'
  },
  {
    name: 'ALFA ROMEO',
    nameFipe: 'Alfa Romeo',
    key: 'alfa-romeo-3'
  },
  {
    name: 'AM GEN',
    nameFipe: 'AM Gen',
    key: 'am-gen-4'
  },
  {
    name: 'ASIA MOTORS',
    nameFipe: 'Asia Motors',
    key: 'asia-motors-5'
  },
  {
    name: 'ASTON MARTIN',
    nameFipe: 'ASTON MARTIN',
    key: 'aston-martin-189'
  },
  {
    name: 'BABY',
    nameFipe: 'Baby',
    key: 'baby-207'
  },
  {
    name: 'BRM',
    nameFipe: 'BRM',
    key: 'brm-8'
  },
  {
    name: 'BUGRE',
    nameFipe: 'Bugre',
    key: 'bugre-123'
  },
  {
    name: 'CADILLAC',
    nameFipe: 'Cadillac',
    key: 'cadillac-10'
  },
  {
    name: 'CBT JIPE',
    nameFipe: 'CBT Jipe',
    key: 'cbt-jipe-11'
  },
  {
    name: 'CHANA',
    nameFipe: 'CHANA',
    key: 'chana-136'
  },
  {
    name: 'CHANGAN',
    nameFipe: 'CHANGAN',
    key: 'changan-182'
  },
  {
    name: 'CHERY',
    nameFipe: 'CHERY',
    key: 'chery-161'
  },
  {
    name: 'CHRYSLER',
    nameFipe: 'Chrysler',
    key: 'chrysler-12'
  },
  {
    name: 'CROSS LANDER',
    nameFipe: 'Cross Lander',
    key: 'cross-lander-14'
  },
  {
    name: 'DAEWOO',
    nameFipe: 'Daewoo',
    key: 'daewoo-15'
  },
  {
    name: 'DAIHATSU',
    nameFipe: 'Daihatsu',
    key: 'daihatsu-16'
  },
  {
    name: 'DODGE',
    nameFipe: 'Dodge',
    key: 'dodge-17'
  },
  {
    name: 'EFFA',
    nameFipe: 'EFFA',
    key: 'effa-147'
  },
  {
    name: 'ENGESA',
    nameFipe: 'Engesa',
    key: 'engesa-18'
  },
  {
    name: 'ENVEMO',
    nameFipe: 'Envemo',
    key: 'envemo-19'
  },
  {
    name: 'FERRARI',
    nameFipe: 'Ferrari',
    key: 'ferrari-20'
  },
  {
    name: 'FIBRAVAN',
    nameFipe: 'Fibravan',
    key: 'fibravan-149'
  },
  {
    name: 'FOTON',
    nameFipe: 'FOTON',
    key: 'foton-190'
  },
  {
    name: 'FYBER',
    nameFipe: 'Fyber',
    key: 'fyber-170'
  },
  {
    name: 'GEELY',
    nameFipe: 'GEELY',
    key: 'geely-199'
  },
  {
    name: 'GREAT WALL',
    nameFipe: 'GREAT WALL',
    key: 'great-wall-153'
  },
  {
    name: 'GURGEL',
    nameFipe: 'Gurgel',
    key: 'gurgel-24'
  },
  {
    name: 'HAFEI',
    nameFipe: 'HAFEI',
    key: 'hafei-152'
  },
  {
    name: 'ISUZU',
    nameFipe: 'Isuzu',
    key: 'isuzu-27'
  },
  {
    name: 'IVECO',
    nameFipe: 'IVECO',
    key: 'iveco-208'
  },
  {
    name: 'JAC',
    nameFipe: 'JAC',
    key: 'jac-177'
  },
  {
    name: 'JAGUAR',
    nameFipe: 'Jaguar',
    key: 'jaguar-28'
  },
  {
    name: 'JEEP',
    nameFipe: 'Jeep',
    key: 'jeep-29'
  },
  {
    name: 'JINBEI',
    nameFipe: 'JINBEI',
    key: 'jinbei-154'
  },
  {
    name: 'JPX',
    nameFipe: 'JPX',
    key: 'jpx-30'
  },
  {
    name: 'LADA',
    nameFipe: 'Lada',
    key: 'lada-32'
  },
  {
    name: 'LAMBORGHINI',
    nameFipe: 'LAMBORGHINI',
    key: 'lamborghini-171'
  },
  {
    name: 'LAND ROVER',
    nameFipe: 'Land Rover',
    key: 'land-rover-33'
  },
  {
    name: 'LEXUS',
    nameFipe: 'Lexus',
    key: 'lexus-34'
  },
  {
    name: 'LIFAN',
    nameFipe: 'LIFAN',
    key: 'lifan-168'
  },
  {
    name: 'LOBINI',
    nameFipe: 'LOBINI',
    key: 'lobini-127'
  },
  {
    name: 'LOTUS',
    nameFipe: 'Lotus',
    key: 'lotus-35'
  },
  {
    name: 'MAHINDRA',
    nameFipe: 'Mahindra',
    key: 'mahindra-140'
  },
  {
    name: 'MASERATI',
    nameFipe: 'Maserati',
    key: 'maserati-36'
  },
  {
    name: 'MATRA',
    nameFipe: 'Matra',
    key: 'matra-37'
  },
  {
    name: 'MAZDA',
    nameFipe: 'Mazda',
    key: 'mazda-38'
  },
  {
    name: 'MCLAREN',
    nameFipe: 'Mclaren',
    key: 'mclaren-211'
  },
  {
    name: 'MERCURY',
    nameFipe: 'Mercury',
    key: 'mercury-40'
  },
  {
    name: 'MG',
    nameFipe: 'MG',
    key: 'mg-167'
  },
  {
    name: 'MINI',
    nameFipe: 'MINI',
    key: 'mini-156'
  },
  {
    name: 'MIURA',
    nameFipe: 'Miura',
    key: 'miura-42'
  },
  {
    name: 'PLYMOUTH',
    nameFipe: 'Plymouth',
    key: 'plymouth-45'
  },
  {
    name: 'PONTIAC',
    nameFipe: 'Pontiac',
    key: 'pontiac-46'
  },
  {
    name: 'PORSCHE',
    nameFipe: 'Porsche',
    key: 'porsche-47'
  },
  {
    name: 'RAM',
    nameFipe: 'RAM',
    key: 'ram-185'
  },
  {
    name: 'RELY',
    nameFipe: 'RELY',
    key: 'rely-186'
  },
  {
    name: 'ROLLS-ROYCE',
    nameFipe: 'Rolls-Royce',
    key: 'rolls-royce-195'
  },
  {
    name: 'ROVER',
    nameFipe: 'Rover',
    key: 'rover-49'
  },
  {
    name: 'SAAB',
    nameFipe: 'Saab',
    key: 'saab-50'
  },
  {
    name: 'SATURN',
    nameFipe: 'Saturn',
    key: 'saturn-51'
  },
  {
    name: 'SEAT',
    nameFipe: 'Seat',
    key: 'seat-52'
  },
  {
    name: 'SHINERAY',
    nameFipe: 'SHINERAY',
    key: 'shineray-183'
  },
  {
    name: 'SMART',
    nameFipe: 'smart',
    key: 'smart-157'
  },
  {
    name: 'SSANGYONG',
    nameFipe: 'SSANGYONG',
    key: 'ssangyong-125'
  },
  {
    name: 'SUBARU',
    nameFipe: 'Subaru',
    key: 'subaru-54'
  },
  {
    name: 'TAC',
    nameFipe: 'TAC',
    key: 'tac-165'
  },
  {
    name: 'TROLLER',
    nameFipe: 'Troller',
    key: 'troller-57'
  },
  {
    name: 'WAKE',
    nameFipe: 'Wake',
    key: 'wake-163'
  },
  {
    name: 'WALK',
    nameFipe: 'Walk',
    key: 'walk-120'
  }
];

module.exports = brands;
