let _componentLogic=(name:string,subName:string)=>`
import 'package:tl_getx/tl_getx.dart';

import 'state.dart';

class ${name}Logic extends GetSController<${name}State> {
  ${name}Logic({${name}State? state}) : super(state ?? ${name}State());

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

export var componentLogic=_componentLogic;