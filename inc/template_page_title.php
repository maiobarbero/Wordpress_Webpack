<?php 

if (is_category()) {
    single_cat_title();
} elseif (is_tag()) {
    single_tag_title();
} elseif (is_author()) {
    the_post();
    echo 'Author archive: ' . get_the_author();
    rewind_posts();
} elseif (is_day()) {
    echo 'Daily archive: ' . get_the_date();
} elseif (is_month()) {
    echo 'Montly archive: ' . get_the_date('F Y');
} elseif (is_year()) {
    echo 'Annual archive: ' . get_the_date('Y');
} else {
    echo 'Archive:';
}

?>