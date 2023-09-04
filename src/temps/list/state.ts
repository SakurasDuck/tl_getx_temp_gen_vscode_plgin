let _listState=(name:string,subName:string)=>`
import 'package:tl_getx/tl_getx.dart';

class ${name}State {
  ${name}State();
  // 总数
  final RxInt total = 0.obs;
}
`;

export var listState=_listState;