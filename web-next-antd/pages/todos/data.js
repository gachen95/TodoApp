import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { basicOptions, listPageUpdateQuery } from '../../data/detailsCommon'

export const todosBasic = gql`
	query todosBasic($page: Int = 1, $pageSize: Int = 10) {
		getTodosPages(page: $page, pageSize: $pageSize) {
			page
			count
			items {
				title
				id
			}
		}
	}
`

export default graphql(todosBasic, {
	options: basicOptions.options,
	props: ({data, ownProps}) => {

		const { loading, fetchMore, getTodosPages = {} } = data
		const { page = 1, count = 0, items = [] } = getTodosPages

		const loadPage = (page, pageSize) => {
			return fetchMore({
				variables: {
					page,
					pageSize
				},
				updateQuery: listPageUpdateQuery
			})
		}
		return Object.assign({}, ownProps, { data: items, page, count, loadPage, loading })
	}
})