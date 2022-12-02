import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from '../../models/cart.model'
import {CartService} from '../../services/cart.service'
import {HttpClient} from '@angular/common/http'
import {loadStripe} from '@stripe/stripe-js'

@Component({
		selector: 'app-cart',
		templateUrl: 'cart.component.html',
})
export class CartComponent implements OnInit {
		cart: Cart = {
				items: [
						{
								product: 'https://via.placeholder.com/150',
								name: 'snickers',
								price: 150,
								quantity: 1,
								id: 1,
						},
						{
								product: 'https://via.placeholder.com/150',
								name: 'snickers',
								price: 150,
								quantity: 3,
								id: 2,
						},
				]
		}

		dataSource: CartItem[] = []
		displayedColumns: string[] = [
				'product',
				'name',
				'price',
				'quantity',
				'total',
				'action',
		]

		constructor(private cartService: CartService, private httpClient: HttpClient) {
		}

		ngOnInit(): void {
				this.cartService.cart.subscribe((_cart) => {
						this.cart = _cart
						this.dataSource = this.cart.items
				})
		}

		getTotal(items: CartItem[]) {
				return this.cartService.getTotal(items)
		}

		onClearCart() {
				this.cartService.clearCart()
		}

		onRemoveFromCart(item: CartItem) {
				this.cartService.removeFromCart(item)
		}

		onAddQuantity(item: CartItem) {
				this.cartService.addToCart(item)
		}

		onRemoveQuantity(item: CartItem) {
				this.cartService.removeQuantity(item)
		}

		onCheckout() {
				this.httpClient.post('http://localhost:4242/checkout', {
						items: this.cart.items
				}).subscribe(async (res: any) => {
						let stripe = await loadStripe('pk_test_51MAZpZGYzz2WIXBeQL8XS7P4GLq4iabw87hPbs6jHTrqOCkyqpyiW0RvicGKObBqOF1U7a0784bLQ9akDcoPWb3700yiH5a0R2')
						stripe?.redirectToCheckout({
								sessionId: res.id
						})
				})
		}
}
