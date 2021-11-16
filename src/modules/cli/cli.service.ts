import { Command, Console } from 'nestjs-console';
import { AddressService } from '../address/address.service';
import * as XLSX from 'xlsx';

@Console()
export class CliService {
  constructor(private readonly addressService: AddressService) {}

  @Command({
    command: 'importaddress',
    description: 'List content of a directory'
  })
  async listContent(): Promise<void> {
    const dataSheet = XLSX.readFile('src/utils/address_data.xls');
    const workSheets: any = {};
    for (const sheetName of dataSheet.SheetNames) {
      workSheets[sheetName] = XLSX.utils.sheet_to_json(
        dataSheet.Sheets[sheetName]
      );
    }

    const provinceData = [];
    const districtData = [];
    const wardData = [];

    for (const record of workSheets.Sheet1) {
      const provinceExisted = provinceData.some(
        (province) => Number(province.id) === Number(record.provinceId)
      );
      if (!provinceExisted) {
        provinceData.push({
          id: Number(record.provinceId),
          name: record.provinceName
        });
      }
      const districtExisted = districtData.some(
        (district) => Number(district.id) === Number(record.districtId)
      );
      if (!districtExisted) {
        districtData.push({
          id: Number(record.districtId),
          name: record.districtName,
          provinceId: Number(record.provinceId)
        });
      }
      wardData.push({
        id: Number(record.wardId),
        name: record.wardName,
        districtId: Number(record.districtId)
      });
    }
    await this.addressService.addProvince(provinceData);
    await this.addressService.addDistrict(districtData);
    await this.addressService.addWard(wardData);
  }
}
