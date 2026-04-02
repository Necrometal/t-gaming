import { ResendCodeListener } from '@/events/listener/ResendCodeListener';
import { UserConfirmedAccountEventListener } from '@/events/listener/UserConfirmedAccountListener';
import { UserRegisteredListener } from '@/events/listener/UserRegisteredListener';
import { UserResetPasswordListener } from '@/events/listener/UserResetPasswordListener';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    UserRegisteredListener,
    ResendCodeListener,
    UserConfirmedAccountEventListener,
    UserResetPasswordListener,
  ],
})
export class EventsListenerModule {}
