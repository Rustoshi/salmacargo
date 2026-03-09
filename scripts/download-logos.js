const https = require('https');
const fs = require('fs');
const path = require('path');

const logos = {
  'fedex': 'https://upload.wikimedia.org/wikipedia/commons/b/b0/FedEx_Corporation_logo.svg',
  'dhl': 'https://upload.wikimedia.org/wikipedia/commons/1/10/DHL_Logo.svg',
  'ups': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/UPS_Logo_Shield_2017.svg',
  'usps': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/USPS_logo.svg',
  'tnt': 'https://upload.wikimedia.org/wikipedia/commons/5/52/TNT_Express_Logo.svg',
  'aramex': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Aramex_logo.svg'
};

const brandsDir = path.join(__dirname, '..', 'public', 'brands');

// Create brands directory if it doesn't exist
if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

// Download each logo
Object.entries(logos).forEach(([name, url]) => {
  const file = fs.createWriteStream(path.join(brandsDir, `${name}.svg`));
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name} logo`);
    });
  }).on('error', (err) => {
    fs.unlink(path.join(brandsDir, `${name}.svg`), () => {});
    console.error(`Error downloading ${name} logo:`, err.message);
  });
});
