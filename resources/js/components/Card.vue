<template>
  <div>
    <div
      v-if="!editing"
      class="flex justify-between bg-white shadow-card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 group"
    >
      <div>
        {{ card.title }}
      </div>
      <div
        class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500"
      >
        <div class="px-1 text-gray-400 hover:text-yellow-700" @click="editing = true">
          E
        </div>
        <div class="px-1 text-gray-400 hover:text-red-700" @click="cardDelete">D</div>
      </div>
    </div>
    <CardEditor
      v-model="title"
      class="mb-2"
      v-else
      label="Save Card"
      @closed="editing = false"
      @saved="cardUpdate"
    ></CardEditor>
  </div>
</template>
<script>
import CardDeleteMutation from "../graphql/CardDelete.gql";
import { EVENT_CARD_DELETED, EVENT_CARD_UPDATED } from "../constents.js";
import CardEditor from "./CardEditor";
import CardUpdateMutation from "../graphql/CardUpdate.gql";

export default {
  components: { CardEditor },
  data() {
    return {
      editing: false,
      title: this.card.title,
    };
  },
  props: {
    card: Object,
  },
  methods: {
    cardUpdate() {
      const self = this;

      this.$apollo.mutate({
        mutation: CardUpdateMutation,
        variables: {
          id: this.card.id,
          title: this.title,
        },
        update(store, { data: cardUpdate }) {
          self.$emit("updated", {
            store,
            data: cardUpdate,
            type: EVENT_CARD_UPDATED,
          });
          self.editing = false;
        },
      });
    },
    cardDelete() {
      const self = this;

      this.$apollo.mutate({
        mutation: CardDeleteMutation,

        variables: {
          id: this.card.id,
        },

        update(store, { data: { cardDelete } }) {
          self.$emit("deleted", {
            store,
            data: cardDelete,
            type: EVENT_CARD_DELETED,
          });
        },
      });
    },
  },
};
</script>
