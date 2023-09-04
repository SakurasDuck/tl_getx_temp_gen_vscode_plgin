let _listView=(name:string,subName:string)=>`
import 'package:flutter/material.dart';
import 'package:tl_package/tl_package.dart';
import 'package:tl_widgets/tl_widgets.dart';

import '${subName}_item/view.dart';
import 'logic.dart';
import 'state.dart';

class ${name}View extends GetSView<${name}State, ${name}Logic> {
  const ${name}View({super.tag,super.key});

  @override
  Widget build(BuildContext context) {
    return Obx(() =>
          Refresh(
            canLoadMore: (_) async =>
            controller.itemList.length <
                state.total.value,
            refreshFunc: () async => controller.onRefresh(),
            loadMoreFunc: () async => controller.onLoadMore(),
            child: ListView.builder(
                itemCount: controller.itemList.length,
                itemBuilder: (context, index) =>
                    ItemViewWrap(
                        itemBinds: controller.itemIndex2binds(index),
                        child: ${name}ItemView(
                          tag: controller.itemIndex2Tag(index),
                        )
                    )
            ),
          ));
  }
}
`;

export var listView=_listView;