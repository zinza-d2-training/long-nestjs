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

    for (const record of workSheets.Sheet1) {
      await this.addressService.addProvince({
        id: Number(record.provinceId),
        name: record.provinceName
      });
      await this.addressService.addDistrict({
        id: Number(record.districtId),
        name: record.districtName,
        provinceId: Number(record.provinceId)
      });
      await this.addressService.addWard({
        id: Number(record.wardId),
        name: record.wardName,
        districtId: Number(record.districtId)
      });
    }
  }
}
