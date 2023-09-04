let _listLogic=(name:string,subName:string)=>`
import 'package:tl_getx/tl_getx.dart';

import '${subName}_item/binding.dart';
import '${subName}_item/logic.dart';
import '${subName}_item/state.dart';
import 'state.dart';

class ${name}Logic extends GetSController<${name}State>
    with RxListMixin<${name}ItemState, ${name}ItemLogic> {
  ${name}Logic({${name}State? state}) : super(state ?? ${name}State());

  @override
  void onInit() {
    super.onInit();
  }

  Future<void> onRefresh() async {}

  Future<void> onLoadMore() async {}

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

  @override
  String item2LogicTag(${name}ItemLogic t) {
    //todo set item unionKey
    throw Exception('must set itemKey');
  }

  @override
  List<Bind> itemBind(${name}ItemLogic val, String tag) {
    return ${name}ItemBinding().itemDependencies(val.state, tag);
  }
}
`;

export var listLogic=_listLogic;