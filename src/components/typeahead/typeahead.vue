/**
* @file
* @author jhh678
* @date 2017/9/8
*/
<template>
	<div>
		<slot>
			<input data-role="input" class="form-control" type="text" placeholder="Type to search...">
		</slot>
		<dropdown ref="dropdown"
							v-model="openDropdown"
							:append-to-body="appendToBody"
							:not-close-elements="elements"
							:position-element="inputEl">
			<template slot="dropdown">
				<slot name="item" :items="items" :active-index="activeIndex" :select="selectItem" :highlight="highlight">
					<li v-for="(item,index) in items" :class="{active:activeIndex===index}">
						<a href="javascript:void(0)" @click="selectItem(item)">
							<span v-html="highlight(item)"></span>
						</a>
					</li>
				</slot>
			</template>
		</dropdown>
	</div>
</template>

<script>
  import axios from 'axios'
  import domUtils from '@/utils/domUtils'
  import Dropdown from '@/components/dropdown/dropdown.vue'
  export default {
    components: {Dropdown},
    props: {
      value: {},
      data: {
        type: Array
      },
      itemKey: {
        type: String
      },
      appendToBody: {
        type: Boolean,
        'default': false
      },
      ignoreCase: {
        type: Boolean,
        'default': true
      },
      matchStart: {
        type: Boolean,
        'default': false
      },
      forceSelect: {
        type: Boolean,
        'default': false
      },
      limit: {
        type: Number,
        'default': 10
      },
      asyncObj: {
        type: Object
      },
      asyncKey: {
        type: String
      },
      debounce: {
        type: Number,
        'default': 200
      },
      openOnFocus: {
        type: Boolean,
        'default': true
      },
      openOnEmpty: {
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        inputEl: null,
        items: [],
        activeIndex: 0,
        timeoutID: 0,
        elements: [],
        openDropdown: false,
        dropdownMenuEl: null
      }
    },
    computed: {
      regexOptions () {
        let options = ''
        if (this.ignoreCase) {
          options += 'i'
        }
        if (!this.matchStart) {
          options += 'g'
        }
        return options
      }
    },
    mounted () {
      domUtils.ensureElementMatchesFunction()
      this.inputEl = this.$el.querySelector('[data-role="input"]')
      if (this.inputEl) {
        this.elements.push(this.inputEl)
        domUtils.on(this.inputEl, domUtils.events.FOCUS, this.inputFocused)
        domUtils.on(this.inputEl, domUtils.events.BLUR, this.inputBlured)
        domUtils.on(this.inputEl, domUtils.events.INPUT, this.inputChanged)
        domUtils.on(this.inputEl, domUtils.events.KEY_DOWN, this.inputKeyPressed)
      }
      this.dropdownMenuEl = this.$refs.dropdown.$el.querySelector('.dropdown-menu')
    },
    beforeDestroy () {
      if (this.inputEl) {
        domUtils.off(this.inputEl, domUtils.events.FOCUS, this.inputFocused)
        domUtils.off(this.inputEl, domUtils.events.BLUR, this.inputBlured)
        domUtils.off(this.inputEl, domUtils.events.INPUT, this.inputChanged)
        domUtils.off(this.inputEl, domUtils.events.KEY_DOWN, this.inputKeyPressed)
      }
    },
    watch: {
      value (newValue, oldValue) {
        if (typeof newValue === 'string') {
          // direct
          this.inputEl.value = newValue
        } else if (newValue) {
          // is object
          this.inputEl.value = this.itemKey ? newValue[this.itemKey] : newValue
        } else {
          // is null or undefined or something else not valid
          this.inputEl.value = ''
        }
      }
    },
    methods: {
      prepareItems (data) {
        this.items = []
        this.activeIndex = 0
        if (!data) {
          return
        }
        for (let i = 0, l = data.length; i < l; i++) {
          let item = data[i]
          let key = this.itemKey ? item[this.itemKey] : item
          key = key.toString()
          let index = -1
          if (this.ignoreCase) {
            index = key.toLowerCase().indexOf(this.inputEl.value.toLowerCase())
          } else {
            index = key.indexOf(this.inputEl.value)
          }
          if (this.matchStart ? index === 0 : index >= 0) {
            this.items.push(item)
          }
          if (this.items.length >= this.limit) {
            break
          }
        }
      },
      fetchItems (value, debounce) {
        clearTimeout(this.timeoutID)
        if (value === '' && !this.openOnEmpty) {
          this.openDropdown = false
        } else if (this.data) {
          this.prepareItems(this.data)
          this.openDropdown = !!this.items.length
        } else if (this.asyncObj.url) {
          const methods = this.asyncObj.methods
          this.timeoutID = setTimeout(() => {
            axios[methods](this.asyncObj.url + value)
                 .then(data => {
                   let respones = data.data
                   if (this.inputEl.matches(':focus')) {
                     let r = this.asyncKey ? respones[this.asyncKey] : respones
                     this.prepareItems(r)
                     this.openDropdown = !!this.items.length
                   }
                 })
          }, debounce)
        }
      },
      inputChanged () {
        let value = this.inputEl.value
        this.fetchItems(value, this.debounce)
        this.$emit('input', this.forceSelect ? null : value)
      },
      inputFocused () {
        if (this.openOnFocus) {
          let value = this.inputEl.value
          this.fetchItems(value, 0)
        }
      },
      inputBlured () {
        if (!this.dropdownMenuEl.matches(':hover')) {
          this.openDropdown = false
        }
      },
      inputKeyPressed (event) {
        if (this.openDropdown) {
          switch (event.keyCode) {
            case 13:
              this.selectItem(this.items[this.activeIndex])
              break
            case 38:
              this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : 0
              break
            case 40:
              let maxIndex = this.items.length - 1
              this.activeIndex = this.activeIndex < maxIndex ? this.activeIndex + 1 : maxIndex
              break
          }
        }
      },
      selectItem (item) {
        this.$emit('input', item)
        this.openDropdown = false
      },
      highlight (item) {
        let value = this.itemKey ? item[this.itemKey] : item
        let inputValue = this.inputEl.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
        return value.replace(new RegExp(`${inputValue}`, this.regexOptions), '<b>$&</b>')
      }
    }
  }
</script>
