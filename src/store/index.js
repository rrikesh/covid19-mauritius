import Vue from 'vue';
import Vuex from 'vuex';
import timeago from "../helpers/timeago";
import { extractData, fetchJson, groupById } from '@/helpers';

Vue.use(Vuex);

export const SET_STATS = 'SET_STATS';
export const SET_UPDATED = 'SET_UPDATED';

export const FETCH_STATS = 'FETCH_STATS';

export default new Vuex.Store({
  state: {
    stats: [],
    updated: null
  },

  getters: {
    getUpdated(state) {
      return state.updated;
    },
    getStats(state) {
      return state.stats;
    },
    getTimestamps(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.timestamp);
        return result
      } else {
        return {}
      }
    },
    getNew(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.new);
        return result
      } else {
        return {}
      }
    },
    getRecovered(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.recovered);
        return result
      } else {
        return {}
      }
    },
    getDeceased(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.deceased);
        return result
      } else {
        return {}
      }
    },
    getTotalDeceased(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.cumdeceased);
        return result
      } else {
        return {}
      }
    },
    getTotal(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.cumnew);
        return result
      } else {
        return {}
      }
    },
    getActive(state) {
      if (state.stats.length > 0) {
        let result = state.stats.map(row => row.active);
        return result
      } else {
        return {}
      }
    }
  },

  mutations: {
    [SET_STATS](state, stats) {
      state.stats = stats;
    },
    [SET_UPDATED](state, updated) {
      state.updated = {
        value: updated.$t,
        ago: timeago(updated.$t)
      }
    }
  },

  actions: {
    async [FETCH_STATS]({ commit }) {
      const URL = require('@/constants/urls.json')['covid-stats'];

      let entry;
      let updated;
      try {
        const { feed } = await fetchJson(URL);

        entry = feed.entry;
        updated = feed.updated;
      } catch (error) {
        throw new Error(
          'Error should be caught by Vue global error handler.' + error
        );
      }



      const stats = extractData(entry);
      console.log(stats);
      commit(SET_STATS, stats);
      commit(SET_UPDATED, updated);
      return stats;
    }
  }
});
