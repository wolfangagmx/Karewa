import Vue from 'vue';

export default function (api, storeName) {
    const state = {
        docs: [],
        pagination: {
            total: 0,
            page: 1,
            pages: 1
        },
        docName: ''
    };

    const getters = {
        getPaginationQuery(state){
            let pagination = state.pagination;
            let query = '?';
            if (pagination.page) {
                if (query.length > 1) {
                    query += '&';
                }
                query += `page=${pagination.page}`
            }

            return query;
        }
    };

    const actions = {
        list ({commit,getters}) {
            Vue.$log.info(`Calling action ${storeName}/list`);
            let query = getters.getPaginationQuery;
            api.list(
                { query },
                (result) => {
                    // console.log('result', result);
                    Vue.$log.info('Response', result);
                    //result.data.data.docs
                    // commit('updateDocs', {
                    //     docs: result.data.data.docs
                    // });
                    commit('updateDocs', result.data.data);
                },
                (error) => {
                    // console.log('error', error);
                    Vue.$log.error('Response error', error);
                }
            )
        },

        changePage ({commit, getters}) {
            // console.log(`Calling action ${storeName}/changePage`);
            Vue.$log.info(`Calling action ${storeName}/changePage`);
            let query = getters.getPaginationQuery;
            api.list(
                { query },
                (result) => {
                    Vue.$log.info('Response', result);
                    //result.data.data.docs
                    // commit('updateDocs', {
                    //     docs: result.data.data.docs
                    // });
                    commit('updateDocs', result.data.data);
                },
                (error) => {
                    Vue.$log.error('Response error', error);
                    // console.log('error', error);
                }
            )
        }
    };

    const mutations = {
        updateDocs (state, {docs, total, page, pages}) {
            state.docs = docs;
            state.pagination.total = total;
            state.pagination.page = page;
            state.pagination.pages = pages;
        },
        setDocName (state, {docName}) {
            state.docName = docName;
        }
    };

    return {
        state,
        getters,
        actions,
        mutations
    }
}
