import { Module } from '@nestjs/common';
import { InventariTypeController } from './inventari_type.controller';
import { InventariTypeService } from './inventari_type.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [InventariTypeController],
  providers: [InventariTypeService],
})
export class InventariTypeModule {}
