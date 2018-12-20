import React from 'react';
import {StackNavigator} from 'react-navigation';
import Intro from './Components/Intro/Intro';
import Home from './Components/Home/Home';
import HomeMap from './Components/Map/HomeMap';
import TinTuc from './Components/TinTuc/TinTuc';
import NoiDung from './Components/TinTuc/NoiDung';
import TraCuu from './Components/TraCuu/TraCuu';
import ChiTietLuat from './Components/TraCuu/ChiTietLuat';
import Map from './Components/Map/Map';
import CanhBao from './Components/CanhBao/CanhBao';
import ChitTietCanhBao from './Components/CanhBao/ChiTietCanhBao';
import PhanAnh from './Components/PhanAnh/PhanAnh';
import ThanhCong from './Components/PhanAnh/ThanhCong';
import DuongDi from './Components/Duongdi/DuongDi';
export const HomeMain = StackNavigator({
    ManHinh_Chinh:{
        screen: Intro,
        navigationOptions:{
            header: null
        }
    },
    Home:{
        screen: Home,
        navigationOptions:{
            header: null
        }
    },
    HomeMap:{
        screen: HomeMap,
        navigationOptions:{
            header: null
        }
    },
    TinTuc:{
        screen: TinTuc,
        navigationOptions:{
            title:'Tin Tức'
        }
    },
    NoiDung:{
        screen: NoiDung,
        navigationOptions:{
            header: null
        }
    },
    TraCuuLuat:{
        screen: TraCuu,
        navigationOptions:{
            title:'Tra Cứu Luật'
        }
    },
    ChiTietLuat:{
        screen: ChiTietLuat,
        navigationOptions:{
            title:'Chi Tiết Về Luật'
        }
    },
    Map:{
        screen: Map,
        navigationOptions:{
            header: null
        }
    },
    CanhBao:{
        screen: CanhBao,
        navigationOptions:{
            title:'Cảnh Báo Giao Thông'
        }
    },
    DetailChietietcanhbao:{
        screen: ChitTietCanhBao
    },
    PhanAnh:{
        screen: PhanAnh,
        navigationOptions:{
            header: null
        }
    },
    ThanhCong:{
        screen: ThanhCong,
        navigationOptions:{
            header: null
        }

    },
    DuongDi:{
        screen: DuongDi,
        navigationOptions:{
            header: null
        }

    }
});
