<template>
  <div class="h-full flex flex-col items-stretch bg-purple-500">
    <div class="text-white header flex justify-between items-center mb-2 bg-purple-600">
      <div class="ml-2 w-1/3">A</div>
      <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
      <div class="mr-2 w-1/3 flex justify-end">
        <div v-if="isLoggedIn" class="flex items-center">
          <div class="text-sm mr-2">{{ name }}</div>
          <button class="header-btn" @click="logout">Logout</button>
        </div>
        <div v-else>
          <button class="header-btn" @click="$router.push({ name: 'login' })">
            Sign-in
          </button>
          <button class="header-btn" @click="$router.push({ name: 'register' })">
            Register
          </button>
        </div>
      </div>
    </div>
    <div class="h-full flex flex-1 flex-col items-stretch">
      <div class="mx-4 mb-2 text-white font-bold text-lg">
        <span v-if="$apollo.queries.board.loading">Loading...</span>
        <span v-else>{{ board.title }}</span>
      </div>
      <div class="flex flex1 items-start overflow-x-auto mx-2" v-if="board">
        <List
          v-for="list in board.lists"
          :key="list.id"
          :list="list"
          @card-added="updateQueryCache($event)"
          @card-deleted="updateQueryCache($event)"
          @card-updated="updateQueryCache($event)"
        ></List>
      </div>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import List from "./components/List";
import BoardQuary from "./graphql/BoardWithListsAndCards.gql";
import Logout from "./graphql/Logout.gql";
import { EVENT_CARD_ADDED, EVENT_CARD_DELETED, EVENT_CARD_UPDATED } from "./constents.js";
import { mapState } from "vuex";

export default {
  components: { List },
  computed: mapState({
    isLoggedIn: "isLoggedIn",
    name: (state) => state.user.name,
  }),
  apollo: {
    board: {
      query: BoardQuary,
      variables: {
        id: 1,
      },
    },
  },
  methods: {
    async logout() {
      const response = await this.$apollo.mutate({
        mutation: Logout,
      });
      if (response.data?.logout?.id) {
        this.$store.dispatch("logout");
      }
    },
    updateQueryCache(event) {
      const data = event.store.readQuery({
        query: BoardQuary,
        variables: { id: Number(this.board.id) },
      });

      const listByID = () => data.board.lists.find((list) => list.id == event.listId);

      switch (event.type) {
        case EVENT_CARD_ADDED:
          listByID().cards.push(event.data);
          break;

        case EVENT_CARD_DELETED:
          listByID().cards = listByID().cards.filter((card) => card.id != event.data.id);
          break;

        case EVENT_CARD_UPDATED:
          listByID().cards.filter((card) => card.id == event.data.id).title =
            event.data.title;
          break;
      }

      event.store.writeQuery({ query: BoardQuary, data });
    },
  },
};
</script>
<style scoped>
.header {
  height: 40px;
}
</style>
