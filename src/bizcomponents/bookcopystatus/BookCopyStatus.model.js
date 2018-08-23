

import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import { notification } from 'antd'
import GlobalComponents from '../../custcomponents';

import modeltool from '../../utils/modeltool'
const {setupModel,hasError,handleClientError,handleServerError}=modeltool


export default {

  namespace: '_bookCopyStatus',

  state: {},

  subscriptions: {
    
    setup({ dispatch, history }) { 
      history.listen((location) => {
      	const modelName = 'bookCopyStatus'
      	const parameter = {dispatch,history,location,modelName}
        //console.log("setupModel",setupModel,typeof(setupModel))
      	setupModel(parameter)

      })
    },
  },
  effects: {
    *view({ payload }, { call, put, select }) { 
    
<<<<<<< HEAD:src/bizcomponents/companyemployeetermination/CompanyEmployeeTermination.model.js
      const cachedData = yield select(state => state._companyEmployeeTermination)
=======
      const cachedData = yield select(state => state._bookCopyStatus)
>>>>>>> 69fce8703114b35fde9082e9f806d4b3dd160efb:src/bizcomponents/bookcopystatus/BookCopyStatus.model.js
      //if the data in the cache, just show it, there is no delay
      const link = payload.pathname
      //if the data in the cache, just show it, there is no delay
      if(cachedData.class){
<<<<<<< HEAD:src/bizcomponents/companyemployeetermination/CompanyEmployeeTermination.model.js
        //yield put({ type: 'breadcrumb/gotoLink', payload: { displayName:cachedData.displayName,link }} )
=======
        yield put({ type: 'breadcrumb/gotoLink', payload: { displayName:cachedData.displayName,link }} )
>>>>>>> 69fce8703114b35fde9082e9f806d4b3dd160efb:src/bizcomponents/bookcopystatus/BookCopyStatus.model.js
        yield put({ type: 'updateState', payload: cachedData })
      }else{
        yield put({ type: 'showLoading', payload })
      }
<<<<<<< HEAD:src/bizcomponents/companyemployeetermination/CompanyEmployeeTermination.model.js
      
      const {CompanyEmployeeTerminationService} = GlobalComponents;
      const data = yield call(CompanyEmployeeTerminationService.view, payload.id)
      
      const displayName = payload.displayName||data.displayName
=======
>>>>>>> 69fce8703114b35fde9082e9f806d4b3dd160efb:src/bizcomponents/bookcopystatus/BookCopyStatus.model.js
      
      const {BookCopyStatusService} = GlobalComponents;
      const data = yield call(BookCopyStatusService.view, payload.id)
      
<<<<<<< HEAD:src/bizcomponents/companyemployeetermination/CompanyEmployeeTermination.model.js
      yield put({ type: 'breadcrumb/gotoLink', payload: { displayName,link }} )
      
=======
      const displayName = payload.displayName||data.displayName
      
      if(!cachedData.class){
        yield put({ type: 'breadcrumb/gotoLink', payload: { displayName,link }} )
      }
>>>>>>> 69fce8703114b35fde9082e9f806d4b3dd160efb:src/bizcomponents/bookcopystatus/BookCopyStatus.model.js

      yield put({ type: 'updateState', payload: data })
    },
    *load({ payload }, { call, put }) { 
      const {BookCopyStatusService} = GlobalComponents;
      yield put({ type: 'showLoading', payload })
      const data = yield call(BookCopyStatusService.load, payload.id, payload.parameters)
      
      const newPlayload = { ...payload, ...data }
      
      console.log('this is the data id: ', data.id)
      yield put({ type: 'updateState', payload: newPlayload })
    },
    
    *doJob({ payload }, { call, put }) { 
      const {BookCopyStatusService} = GlobalComponents;
      //yield put({ type: 'showLoading', payload })      
      const {serviceNameToCall, id, parameters} = payload;
      if(!serviceNameToCall){
      	handleClientError("没有提供后台服务的名字")
      	return;
      }
      if(!BookCopyStatusService[serviceNameToCall]){
      	handleClientError("找不到后台服务: "+serviceNameToCall)
      	return;
      }
      
      const data = yield call(BookCopyStatusService[serviceNameToCall], id, parameters)
      if(handleServerError(data)){
      	return
      }
      const newPlayload = { ...payload, ...data }
      
      console.log('this is the data id: ', data.id)
      yield put({ type: 'updateState', payload: newPlayload })
    },
       
    
    
    *gotoCreateForm({ payload }, { put }) {
      const { id, type } = payload
      yield put(routerRedux.push(`/bookCopyStatus/${id}/list/${type}CreateForm`))
    },
    *gotoUpdateForm({ payload }, { put }) {
      const { id, type, selectedRows, currentUpdateIndex } = payload
      const state = { id, type, selectedRows, currentUpdateIndex }
      const location = { pathname: `/bookCopyStatus/${id}/list/${type}UpdateForm`, state }
      yield put(routerRedux.push(location))
    },
    *goback({ payload }, { put }) {
      const { id, type,listName } = payload
      yield put(routerRedux.push(`/bookCopyStatus/${id}/list/${type}List/${listName}`))
    },

    *addBookCopy({ payload }, { call, put }) {
      const {BookCopyStatusService} = GlobalComponents;

      const { id, type, parameters, continueNext } = payload
      console.log('get form parameters', parameters)
      const data = yield call(BookCopyStatusService.addBookCopy, id, parameters)
      if (hasError(data)) {
        handleServerError(data)
        return
      }
      const newPlayload = { ...payload, ...data }
      yield put({ type: 'updateState', payload: newPlayload })
      // yield put(routerRedux.push(`/bookCopyStatus/${id}/list/${type}CreateForm'))
      notification.success({
        message: '执行成功',
        description: '执行成功',
      })
      if (continueNext) {
        return
      }
      const partialList = true
      const newState = {...data, partialList}
      const location = { pathname: `/bookCopyStatus/${id}/list/${type}List/书籍副本列表`, state: newState }
      yield put(routerRedux.push(location))
    },
    *updateBookCopy({ payload }, { call, put }) {
      const {BookCopyStatusService} = GlobalComponents;      
      const { id, type, parameters, continueNext, selectedRows, currentUpdateIndex } = payload
      console.log('get form parameters', parameters)
      const data = yield call(BookCopyStatusService.updateBookCopy, id, parameters)
      if (hasError(data)) {
        handleServerError(data)
        return
      }
      const partialList = true
      
      const newPlayload = { ...payload, ...data, selectedRows, currentUpdateIndex,partialList }
      yield put({ type: 'updateState', payload: newPlayload })
      notification.success({
        message: '执行成功',
        description: '执行成功',
      })
      
      if (continueNext) {
        return
      }
      const location = { pathname: `/bookCopyStatus/${id}/list/${type}List/书籍副本列表`, state: newPlayload }
      yield put(routerRedux.push(location))
    },
    *gotoNextBookCopyUpdateRow({ payload }, { call, put }) {
      const { id, type, parameters, continueNext, selectedRows, currentUpdateIndex } = payload
      const newPlayload = { ...payload, selectedRows, currentUpdateIndex }
      yield put({ type: 'updateState', payload: newPlayload })
    },
    *removeBookCopyList({ payload }, { call, put }) {
      const {BookCopyStatusService} = GlobalComponents; 
      const { id, type, parameters, continueNext } = payload
      console.log('get form parameters', parameters)
      const data = yield call(BookCopyStatusService.removeBookCopyList, id, parameters)
      if (hasError(data)) {
        handleServerError(data)
        return
      }
      const newPlayload = { ...payload, ...data }

      yield put({ type: 'updateState', payload: newPlayload })
        
      // yield put(routerRedux.push(`/bookCopyStatus/${id}/list/${type}CreateForm`))
      notification.success({
        message: '执行成功',
        description: '执行成功',
      })
      // const location = { pathname: `bookCopyStatus/${id}/list/${type}List`, state: data}
      // yield put(routerRedux.push(location))
    },

  },
  
  reducers: {
    updateState(state, action) {
      const payload = { ...action.payload, loading: false }
      return { ...payload }
    },
    showLoading(state, action) {
      // const loading=true
      const payload = { ...action.payload, loading: true }
      return { ...payload }
    },
  },
}

