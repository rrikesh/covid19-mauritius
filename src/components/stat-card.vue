<template>
  <div class="shadow p-4 flex">
    <div class="icon w-20 mr-2  md:mr-4 flex justify-center items-center">
      <img
        class="block w-12 h-12 md:w-20 md:h-20 object-contain"
        :src="`/images/${icon}.svg`"
        :alt="icon"
      />
    </div>
    <div class="description">
      <div class="label text-gray-700 text-n md:text-xl">{{ label }}</div>
      <div class="value-wrapper flex items-baseline">
        <div
          class="value text-gray-800 text-3xl md:text-5xl leading-none font-bold pr-3"
        >
          {{ value }}
        </div>
        <div
          class="diff text-red-400 font-bold "
          :title="`${diff} new cases since yesterday`"
          v-if="diffValue"
        >
          {{ diff }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 0
    },
    icon: {
      type: String,
      default: "corona-icon"
    },
    value: {
      type: Number,
      default: 0
    },
    diff: {
      type: String,
      default: 0
    },
    color: {
      type: String,
      default: 0
    }
  },
  computed: {
    diffValue() {
      if (typeof this.diff == "string") {
        let sign = this.diff.slice(0, 1);
        let value = parseInt(this.diff.slice(1, this.diff.length));
        console.log(value);
        if (isNaN(value)) {
          return 0;
        } else {
          return value;
        }
      } else {
        return "not string";
      }
    }
  }
};
</script>
