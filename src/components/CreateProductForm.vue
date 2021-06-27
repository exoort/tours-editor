<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <v-row>
      <v-col cols="12" md="6">
        <base-input-label>SKU</base-input-label>
        <base-input
          v-model="form.sku"
          :rules="validationRules.sku"
        />
      </v-col>
      <v-col cols="12" md="6">
        <base-input-label>Name</base-input-label>
        <base-input
          v-model="form.name"
          :rules="validationRules.name"
        />
      </v-col>
      <v-col cols="12" md="6">
        <base-input-label>Type</base-input-label>
        <base-dropdown
          v-model="form.type"
          :items="types"
          :rules="validationRules.type"
        />
      </v-col>
      <v-col cols="12" md="6">
        <base-input-label>Customer type</base-input-label>
        <base-dropdown
          v-model="form.customerType"
          :items="customerTypes"
          :rules="validationRules.customerType"
        />
      </v-col>
      <v-col cols="12" md="6">
        <base-input-label>Price</base-input-label>
        <base-input
          v-model.number="form.price"
          :rules="validationRules.price"
          min="0"
          type="number"
        />
      </v-col>
      <v-col cols="12" md="6">
        <base-input-label>Valid value</base-input-label>
        <base-input
          v-model.number="form.validValue"
          :disabled="validValueDisabled"
          :rules="validationRules.validValue"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-checkbox
          v-model="form.allowRecharge"
          color="primary"
          label="Allow recharge"
        />
        <base-input-label>Recharge price</base-input-label>
        <base-input
          v-model.number="form.rechargePrice"
          :disabled="!form.allowRecharge"
          :rules="validationRules.rechargePrice"
          min="0"
          type="number"
        />
      </v-col>
    </v-row>
    <v-divider class="mb-5"/>
    <v-row>
      <v-col cols="12">
        <div class="text-body-1">
          Include type
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined>
          <transfer-products
            :products="availableProducts"
            @transferCreated="fromAvailableTransfered"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined>
          <transfer-products
            :products="transferedProducts"
            :to-right="false"
            @transferCreated="toAvailableTransfered"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mt-5 mb-5"/>
    <v-row>
      <v-col cols="12">
        <div class="text-body-1">
          Pass type
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined>
          <transfer-products
            :products="availableProducts"
            @transferCreated="fromAvailableTransfered2"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined>
          <transfer-products
            :products="transferedProducts2"
            :to-right="false"
            @transferCreated="toAvailableTransfered2"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          block
          color="primary"
          type="submit"
        >
          Create
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import BaseInputLabel from '@/components/common/BaseInputLabel'
import BaseInput from '@/components/common/BaseInput'
import BaseDropdown from '@/components/common/BaseDropdown'
import { customerTypes, types } from '@/data/types'
import TransferProducts from '@/components/TransferProducts'
import { validations } from '@/utils/validations'
import { TRANSFERED_PRODUCT_TYPES } from '@/constants'

const baseForm = {
  sku: '',
  name: '',
  type: '',
  customerType: '',
  price: '',
  validValue: '',
  allowRecharge: false,
  rechargePrice: '',
  includes: []
}

export default {
  name: 'CreateProductForm',
  components: {
    TransferProducts,
    BaseDropdown,
    BaseInput,
    BaseInputLabel
  },
  props: {
    products: {
      required: true,
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      types,
      customerTypes,
      transferedProductsIds: [],
      transferedProductsIds2: [],
      form: baseForm,
      valid: true
    }
  },
  computed: {
    validValueDisabled () {
      return this.form.type === 'BASIC_SINGLE'
    },
    availableProducts () {
      return this.products.filter((product) => !this.transferedProductsIds.includes(product.id) &&
        !this.transferedProductsIds2.includes(product.id))
    },
    transferedProducts () {
      return this.products.filter((product) => this.transferedProductsIds.includes(product.id))
    },
    transferedProducts2 () {
      return this.products.filter((product) => this.transferedProductsIds2.includes(product.id))
    },
    validationRules () {
      return {
        sku: [validations.required],
        name: [validations.required],
        type: [validations.required],
        customerType: [validations.required],
        price: [validations.gte(0)],
        validValue: [validations.gte(0)]
      }
    }
  },
  methods: {
    fromAvailableTransfered (ids) {
      this.transferedProductsIds = this.transferedProductsIds.concat(ids)
    },
    toAvailableTransfered (ids) {
      this.transferedProductsIds = this.transferedProductsIds.filter((productId) => !ids.includes(productId))
    },
    fromAvailableTransfered2 (ids) {
      this.transferedProductsIds2 = this.transferedProductsIds2.concat(ids)
    },
    toAvailableTransfered2 (ids) {
      this.transferedProductsIds2 = this.transferedProductsIds2.filter((productId) => !ids.includes(productId))
    },
    onSubmit () {
      if (!this.$refs.form.validate()) {
        return false
      }
      const product = { ...this.form }
      this.form = baseForm
      product.includes = []
      if (this.transferedProducts && this.transferedProducts.length) {
        this.transferedProducts.forEach(({ id }) => product.includes.push({
          type: TRANSFERED_PRODUCT_TYPES.INCLUDE,
          connectedProduct: { id }
        }))
      }
      if (this.transferedProducts2 && this.transferedProducts2.length) {
        this.transferedProducts2.forEach(({ id }) => product.includes.push({
          type: TRANSFERED_PRODUCT_TYPES.PASS,
          connectedProduct: { id }
        }))
      }

      this.$emit('success', product)
    }
  },
  watch: {
    'form.type' (value) {
      if (value === 'BASIC_SINGLE') {
        this.form.validValue = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
