#import <UIKit/UIKit.h>

#import "RNDarkMode.h"

@implementation RNDarkMode
{
	bool hasListeners;
}

- (id)init
{
	self = [super init];

	if (self) {
		[UIScreen setCurrentManager:self];
	}

	return self;
}

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
	NSNumber *supportsDarkMode = [NSNumber numberWithBool:NO];
	if (@available(iOS 13.0, *)) {
		supportsDarkMode = [NSNumber numberWithBool:YES];
	}
	
	return @{
		@"initialMode": [UIScreen getCurrentMode],
		@"supportsDarkMode": supportsDarkMode,
	};
}

- (NSArray<NSString *> *)supportedEvents
{
	return @[@"CurrentModeChanged"];
}

- (void)currentModeChanged:(NSString *)newMode
{
	if (hasListeners) {
		[self sendEventWithName:@"CurrentModeChanged" body:newMode];
	}
}

- (void)startObserving
{
	hasListeners = YES;
}

- (void)stopObserving
{
	hasListeners = NO;
}

+ (BOOL)requiresMainQueueSetup
{
	return YES;
}

@end
