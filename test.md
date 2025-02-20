```diff
--- slider-wd/trunk/admin/views/Sliders.php	(r3103665)
+++ slider-wd/trunk/admin/views/Sliders.php	(r3114483)
@@ -93,7 +93,7 @@
   <a href="<?php echo $edit_url; ?>">
     <span class="media-icon image-icon">
-      <img class="preview-image" title="<?php echo $row->name; ?>" src="<?php echo $preview_image; ?>" width="60" height="60" />
+      <img class="preview-image" title="<?php echo esc_html($row->name); ?>" src="<?php echo esc_url($preview_image); ?>" width="60" height="60" />
     </span>
-    <?php echo $row->name; ?>
+    <?php echo esc_html($row->name); ?>
   </a>
   <?php if ( !$row->published ) { ?>
 
@@ -137,7 +137,7 @@
   <option><?php _e('-select-', WDS()->prefix); ?></option>
   <?php foreach ( $params['rows'] as $row ) { ?>
-    <option value="<?php echo $row->id; ?>"><?php echo $row->name; ?></option>
+    <option value="<?php echo esc_attr($row->id); ?>"><?php echo esc_html($row->name); ?></option>
   <?php } ?>
 </select>
 
@@ -234,7 +234,7 @@
   <div class="buttons_conteiner">
     <h1 class="wp-heading-inline"><?php _e('Slider Title', WDS()->prefix); ?></h1>
-    <input type="text" id="name" name="name" value="<?php echo $row->name; ?>" size="20" class="wds_requried" data-name="<?php _e('Slider title', WDS()->prefix); ?>" />
+    <input type="text" id="name" name="name" value="<?php echo esc_html($row->name); ?>" size="20" class="wds_requried" data-name="<?php _e('Slider title', WDS()->prefix); ?>" />
     <div class="wds_buttons">
       <button class="button button-primary button-large" onclick="spider_set_input_value('task', 'apply'); if(!wds_spider_ajax_save('sliders_form', event)) return false;">

```
