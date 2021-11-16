import axios from 'axios';
import * as XLSX from 'xlsx';

(async () => {
  const dataSheet = XLSX.readFile('src/utils/address_data.xls');
  const workSheets: any = {};
  for (const sheetName of dataSheet.SheetNames) {
    workSheets[sheetName] = XLSX.utils.sheet_to_json(
      dataSheet.Sheets[sheetName]
    );
  }

  for (const record of workSheets.Sheet1) {
    await axios
      .post('http://localhost:3000/address/provinces', {
        id: Number(record.provinceId),
        name: record.provinceName
      })
      .then(() => console.log('success'))
      .catch(() => console.log('failure'));

    await axios
      .post('http://localhost:3000/address/districts', {
        id: Number(record.districtId),
        name: record.districtName,
        provinceId: Number(record.provinceId)
      })
      .then(() => console.log('success'))
      .catch(() => console.log('failure'));

    await axios
      .post('http://localhost:3000/address/wards', {
        id: Number(record.wardId),
        name: record.wardName,
        districtId: Number(record.districtId)
      })
      .then(() => console.log('success'))
      .catch(() => console.log('failure'));
  }
})();
