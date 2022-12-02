import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service'
import {Product} from '../../models/product.model'
import {Subscription} from 'rxjs'
import {StoreService} from '../../services/store.service'

const ROWS_HEIGHT: { [colsCount: number]: number } = {1: 400, 3: 335, 4: 350}

@Component({
		selector: 'app-home',
		templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
		cols = 3
		rowHeight = ROWS_HEIGHT[this.cols]
		category: string | undefined
		products: Product[] | undefined
		sort = 'desc'
		count = '12'
		productsSubscription: Subscription | undefined

		constructor(private cartService: CartService, private storeService: StoreService) {
		}

		ngOnInit(): void {
				this.getProducts()
		}

		getProducts() {
				this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
						.subscribe((_products) => {
								this.products = _products
						})
		}

		onColumnsCountChange(colsNum: number) {
				this.cols = colsNum
				this.rowHeight = ROWS_HEIGHT[colsNum]
		}

		onShowCategory(newCategory: string) {
				this.category = newCategory
				this.getProducts()
		}

		onAddToCart(product: Product) {
				this.cartService.addToCart({
						product: product.image,
						name: product.title,
						price: product.price,
						quantity: 1,
						id: product.id,
				})
		}

		ngOnDestroy() {
				if (this.productsSubscription) {
						this.productsSubscription.unsubscribe()
				}
		}

		onItemsCountChange(newCount: number) {
				this.count = newCount.toString()
				this.getProducts()
		}

		onSortChange(newSort: string) {
				this.sort = newSort
				this.getProducts()
		}
}
