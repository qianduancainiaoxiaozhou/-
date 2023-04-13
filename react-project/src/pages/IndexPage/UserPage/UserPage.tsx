import React, { useState, useEffect, useRef } from 'react';
import { Space, Table, Button, Pagination } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useSelector, useDispatch } from 'react-redux'
import { AddUser } from '../../../store/modules/User/UserAction';
import Breadcrumb1 from '../../../component/Breadcrumb1';
import AddModifyUser from './AddModifyUser';     //引入需修改用户组件
import ViewUser from './ViewUser';         //查看用户的组件
import HeadOperation from '../../../component/HeadOperation';
import { findUser } from '../../../store/modules/FindUser/FindUserActions'; //引入查询用户的方法
interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  ssex: string;
  status: string;
}

type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

const UserPage = () => {
  const childRef: any = useRef()                   //用于父组件调取子组件的方法
  const [options1, setoptions1] = useState(null)   //用来给修改的子组件传值
  const [options2, setoptions2] = useState({})     //给查看用户的子组件传值
  const codeRef: any = useRef(null)                    //用于存储勾选的初始数据
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => {      //获取状态机用户数据的值
    //console.log(state.findUser);
    //Object.keys(state.findUser).length==0 判断对象是否为空
    return Object.keys(state.findUser).length == 0 ? state.addUser : state.findUser
  })
  const findUserData = useSelector((state: any) => {      //调取查询用户的数据
    return state.findUser
  })
  useEffect(() => {
    dispatch(AddUser({}) as any)
  }, [])
  const data: any = userData.rows;  //把值传给data用于表格的渲染

  const open = (options: any) => {      //打开修改用户的抽屉
    //  console.log(options);
    setoptions1(options)       //把值重新赋值
  }
  const open2 = (options: any) => {           //新增用户，打开抽屉的方法
    setoptions1(options)
  }
  const open1 = (options: any) => {        //打开查看用户的模态框
    childRef.current.showModal()
    setoptions2(options)       //把值重新赋值 
  }
  const closeModify = () => {     //关闭抽屉调用的函数
    setoptions1(null)
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'username',
      sorter: (a: any, b: any) => a.username.length - b.username.length,    //升序或则降序,根据长度进行降序
    },

    {
      title: '性别',
      dataIndex: 'ssex',
      filterMultiple: false,   //是否多选
      render: (text: any) => {
        if (text == 1) {
          return '男'
        }
        if (text == 0) {
          return '女'
        }
        return '保密'
      },
      filters: [
        {
          text: '男',
          value: '1',
        },
        {
          text: '女',
          value: '0',
        },
        {
          text: '保密',
          value: '2',
        },
      ],
      onFilter: (value, record) => record.ssex ? record.ssex.indexOf(value as string) === 0 : false,    //进行筛选,进行判定
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
    },
    {
      title: '电话',
      dataIndex: 'mobile',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any) => {
        if (text == 1) {
          return (
            <Button type="primary">有效</Button>
          )
        }
        return <Button type="primary" danger>锁定</Button>

      },
      filterMultiple: false,   //是否多选
      filters: [
        {
          text: '有效',
          value: '1',
        },
        {
          text: '锁定',
          value: '0',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,    //进行筛选
    },
    {
      title: '操作',
      key: 'action',
      // sorter: true,
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => open(record)}>修改</a>
          <a onClick={() => open1(record)}>
            <Space>
              查看
            </Space>
          </a>
        </Space>
      ),
    },
  ];
  const onChange = (pageNumber: any) => {    //页码改变的回调
    // console.log('Page: ', pageNumber);
    //判断Object.keys(findUserData).length==0是否为空对象
    console.log(Object.keys(findUserData).length == 0);
    
    if (Object.keys(findUserData).length == 0) {
      dispatch(AddUser({ pageNum: pageNumber }) as any)   //调取获取所有用户的方法
    }
    dispatch(findUser(`pageNum=${pageNumber}`) as any)   //调取查询用户的方法
  };
  const onPage = (current: any, size: any) => {                      //页数改变的回调
    // console.log(current, size);
    if (Object.keys(findUserData).length == 0) {
      dispatch(AddUser({ pageSize: size }) as any)         //调取状态机方法获取所有用户
    }
     dispatch(findUser({ pageSize: size }) as any)         //调取查询用户的方法
  }
  const [hasData, setHasData] = useState(true);
  const [top, setTop] = useState<TablePaginationPosition | 'none'>('none');
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>();



  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  return (
    <div >
      {/* 面包屑导航 */}
      <Breadcrumb1></Breadcrumb1>
      {/*头部操作区域  */}
      <HeadOperation open2={open2} codeRef={codeRef} Name='用户名'></HeadOperation>
      {/* 表格区域 */}
      <Table
        rowSelection={{
          type: 'checkbox', onChange: (selectedRowKeys, selectedRows) => {    //rowSelection该属性是做表格勾选的
            // console.log(selectedRowKeys, selectedRows);
            codeRef.current = selectedRowKeys
          }
        }}
        pagination={false}   //不进行分页
        columns={tableColumns}          //表格类型
        dataSource={hasData ? data : []}   //表格数据渲染
        // scroll={scroll}
        rowKey='userId'

      />
      {/* 分页功能 */}
      <div style={{ position: 'relative', left: 500, marginTop: 20 }}>
        <Pagination showQuickJumper total={userData.total} onChange={onChange}
          showSizeChanger
          defaultCurrent={1}
          onShowSizeChange={onPage}
        />
      </div>
      {/* 修改和新增用户组件 */}
      {
        options1 ? <AddModifyUser closeModify={closeModify} options1={options1}></AddModifyUser> : null  //修改用户 通过控制options1是否有值来打开抽屉
      }
      {/* 查看用户组件 */}
      <ViewUser ref={childRef} options2={options2}></ViewUser>
    </div>
  )
}

export default UserPage