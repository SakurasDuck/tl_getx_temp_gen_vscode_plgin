let _itemBinding=(name:string,subName:string)=>`
import 'package:tl_getx/tl_getx.dart';

import 'logic.dart';
import 'state.dart';

class ${name}ItemBinding extends ListItemBindings<${name}ItemState> {
  @override
  List<Bind> itemDependencies(${name}ItemState item, String tag) {
    return [
      ItemBind.lazyPut<${name}ItemLogic>(() => ${name}ItemLogic(item),
          tag: tag,)
    ];
  }
}
`;

export var itemBinding=_itemBinding;