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
        id: record['Mã TP'],
        provinceName: record['Tỉnh / Thành Phố']
      })
      .then(() => console.log('success'))
      .catch(() => console.log('failure'));

    await axios
      .post('http://localhost:3000/address/districts', {
        id: record['Mã QH'],
        districtName: record['Quận Huyện'],
        provinceId: record['Mã TP']
      })
      .then(() => console.log('success'))
      .catch(() => console.log('failure'));

    await axios
      .post('http://localhost:3000/address/wards', {
        id: record['Mã'],
        wardName: record['Tên'],
        districtId: record['Mã QH']
      })
      .then(() => console.log('success'))
      .catch(() => console.log('failure'));
  }
})();
