import React from "react";
import { Breadcrumb, Skeleton, Pagination, Icon, Empty, Button, Table, Divider } from "antd";
import Link from "next/link";

class ListPage extends React.Component {

  render() {
    const {
      children,
      onPagerChange,
      title,
      page,
      count,
      loading,
      data,
      type
		} = this.props;

		const columns = [
			{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
			},
			{
				title: "Title",
				dataIndex: 'title',
				key: 'title',
			}, {
				title: 'Action',
				key: 'action',
				render: (text, record) => (
					<span>						
						<Link as={`/${type}/details/${record.id}`} href={`/${type}/details/?id=${record.id}`}>						
							<a><Icon type="info-circle" /></a>
            </Link>
						<Divider type="vertical" />
						<Link as={`/${type}/edit/${record.id}`} href={`/${type}/edit/?id=${record.id}`}>						
							<a><Icon type="edit" /></a>
            </Link>
						<Divider type="vertical" />
						<a href="javascript:;">
							<Icon type="delete" />
						</a>
					</span>
				),
			}];
		
    return (
      <div className="list-page">

        {!data ? (
          <Empty>
            <Button type="primary">Create Now</Button>
          </Empty>
        ) : (
          <div>
						<Pagination
              showSizeChanger
              // showTotal={(total, range) =>
              //   `${range[0]}-${range[1]} of ${total} items`
              // }
							onChange={onPagerChange}
							onShowSizeChange={onPagerChange}
              default={page}
              total={count}
            />
						<br/>
            <ul className="list-page__item-list">
              {loading ? (
                <Skeleton paragraph={{ rows: 6 }} active />
              ) : (
                  <Table dataSource={data} columns={columns} pagination = {false}/>
              )}
            </ul>

            
          </div>
        )}
      </div>
    );
  }
}

export default ListPage;
