Java.perform(function() {
    const ActivityThread = Java.use('android.app.ActivityThread');
    const record = Java.cast(ActivityThread.currentActivityThread().mActivities.value.values().toArray()[0],
        Java.use('android.app.ActivityThread$ActivityClientRecord'));
    const rootActivity = record.activity.value;
    const contentViewId = rootActivity.getResources().getIdentifier('content', "id", record.activity.value.getPackageName());
    console.log(rootActivity.findViewById(contentViewId));
})
