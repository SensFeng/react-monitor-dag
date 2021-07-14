'use strict';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Pagination, Input } from 'antd';
import { CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';
import MonitorDag from '../src/index.tsx';
import mockData from './mock_data/data';
import _ from 'lodash';
import 'antd/dist/antd.css';
import './index.less';

const { Header } = Layout;
const { Search } = Input;

const edgeMenu = [{
  key: 'detail',
  title: '线段信息',
  onClick: (key, data) => {
    console.log('click detail info', data)
  }
}, {
  key: '监控流程',
  render: (key, data) => {
    return <span>监控流程</span>
  },
  onClick: (key, data) => {
    console.log('monitor edge', data);
  }
}]

const groupMenu = [{
  key: 'detail',
  title: '节点组信息',
  onClick: (key, data) => {
    console.log('click detail info')
  }
}, {
  key: 'run',
  render: (key, data) => {
    return <span>节点运行</span>
  },
  onClick: (key, data) => {
    console.log('run node');
  }
}]
const Demo = () => {
  // const [canvasData, setCanvasData] = useState({nodes: [], edges: [], groups: []});
  const [canvasData, setCanvasData] = useState(mockData);

  useEffect(() => {
    // let group = {
    //   id: 'group1',
    //   options: {
    //     title: '测试1'
    //   },
    //   top: 400,
    //   left: 800,
    //   width: 400,
    //   height: 200,
    //   resize: true,
    // };
    // let node = {
    //   id: '21',
    //   title: 'node_groups',
    //   // className: 'icon-background-color',
    //   // iconType: 'icon-guanlian',
    //   top: 100,
    //   left: 150,
    //   group: 'group1',
    //   status: 'success',
    // }
    let newData = _.cloneDeep(canvasData);
    newData.groups = newData.groups.filter(group => {
      return group.id === 'group'
    });
    // newData.nodes.push(node);
    console.log('newData', newData);
    setCanvasData(newData);
  }, []);

  const nodeMenu = [{
    key: 'detail',
    title: '节点信息',
    onClick: (key, data) => {
      console.log('click detail info');
    }
  }, {
    key: 'run',
    render: (key, data) => {
      return <span>节点运行</span>
    },
    onClick: (key, data) => {
      console.log('run node');
    }
  }];
  return <MonitorDag
    data={canvasData}
    nodeMenu={nodeMenu}
    edgeMenu={edgeMenu}
    groupMenu={groupMenu}
    onLoaded={(canvas) => {
      console.log('canvas实例', canvas.getDataMap())
    }}
    config={{
      focusCenter: true,
      direction: 'top-bottom',
      autoLayout: {
        enable: false,
        isAlways: false,
      },
      labelRender: (label, info) => {
        return label;
      },
      labelTipsRender: (label, info) => {
        return `${label}: 自定义label tips`;
      },
      nodeRender: (nodeOpts) => {
        return (
          <span className="node-text">{nodeOpts.title + nodeOpts.id + nodeOpts.status}</span>
        )
      },
      // diffOptions: ['status'],
      // statusNote: {
      //   notes: [{
      //     code: 'fail',
      //     render: () => {
      //       return <span><CloseCircleOutlined />失败</span>
      //     }
      //   }, {
      //     code: 'success',
      //     render: () => {
      //       return <span><CheckOutlined />成功</span>
      //     }
      //   }]
      // },
      nodeTipsRender: (nodeOpts) => {
        return <span>{nodeOpts.title}: 自定义节点tips</span>
      },
      endpointTipsRender: (pointOpts) => {
        return <span>自定义锚点tips</span>
      },
      group: {
        enablePagination: true,
        enableSearch: true
      },
      minimap: {
        enable: true,
        config: {
          nodeColor: 'rgba(216, 216, 216, 0.13)',
          activeNodeColor: '#F66902',
          viewportStyle: {
            'background-color': 'rgba(216, 216, 216, 0.07)'
          },
          groups: mockData.groups,
          nodes: mockData.nodes
        }
      },
    }}
  />
}

ReactDOM.render((
  <Router>
    <Layout>
      <Header className='header'>DTDesign-React运维/监控图</Header>
      <Layout>
        <Demo />
      </Layout>
    </Layout>
  </Router>
), document.getElementById('main'));
