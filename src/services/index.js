import { ProductsService } from '@/services/ProductsService'
import { FileManagerService } from '@/services/FileManagerService'
import { AppNotificationsService } from '@/services/AppNotificationsService'

export const SERVICE_TOKENS = {
  PRODUCTS: 'PRODUCTS',
  FILE_MANAGER: 'FILE_MANAGER',
  APP_NOTIFICATIONS: 'APP_NOTIFICATIONS'
}

export default {
  [SERVICE_TOKENS.PRODUCTS]: new ProductsService(),
  [SERVICE_TOKENS.FILE_MANAGER]: new FileManagerService(),
  [SERVICE_TOKENS.APP_NOTIFICATIONS]: new AppNotificationsService()
}
