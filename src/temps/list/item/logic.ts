let _itemLogic=(name:string,subName:string)=>`
import 'package:tl_getx/tl_getx.dart';

import 'state.dart';

class ${name}ItemLogic extends GetSController<${name}ItemState> {
  ${name}ItemLogic(${name}ItemState state):super(state);

   factory ${name}ItemLogic.init(${name}ItemState state)=>${name}ItemLogic(state);

  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

}
`;

export var itemLogic=_itemLogic;