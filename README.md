# getx-ext-temp-gen README

这是用于生成[tl_get]("https://github.com/SakurasDuck/tl_getx")模版的生成器插件

## Functions  

  1. `page`:  
      - `logic.dart`: 控制器,effects  
      - `state.dart`: 状态模型  
      - `view.dart` : 视图  
      - `page.dart` : 导出  
  2. `list`:  
      - `list.dart`: 导出
      - `logic.dart`: 列表控制器
      - `state.dart`: 列表状态,包含List<ItemState>
      - `view.dart` : 列表视图,自动包含refresh与list-wrapper  
        1. `item_logic.dart`: 子项控制器,包含生命周期
        2. `item_state.dart`: 子项状态
        3. `item_view.dart`: 子项视图
    

## Features

  1. yaml.lock tl_getx插件依赖验证

