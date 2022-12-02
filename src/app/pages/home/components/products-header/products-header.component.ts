import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
		selector: 'app-products-header',
		templateUrl: `products-header.component.html`,
		styles: []
})
export class ProductsHeaderComponent implements OnInit {
		@Output() columnsCountChange = new EventEmitter<number>()
		@Output() itemsCountChange = new EventEmitter<number>()
		@Output() sortChange = new EventEmitter<string>()
		sort = 'desc'
		itemsShowCount = 12

		constructor() {
		}

		ngOnInit(): void {
		}

		onSortUpdated(newSort: string) {
				this.sort = newSort
				this.sortChange.emit(newSort)
		}

		onItemsUpdated(count: number) {
				this.itemsShowCount = count
				this.itemsCountChange.emit(count)
		}

		onColumnsUpdated(colsNum: number) {
				this.columnsCountChange.emit(colsNum)
		}
}
